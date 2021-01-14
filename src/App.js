import { Layout, Dropdown, Menu, Input, Row, Col, Empty, Spin, message, Pagination } from "antd"
import { useState, useEffect } from "react"
import "./assets/css/App.css";
import Card from "./components/Card/Card"
import { MAX_IN_PAGE } from "./constants/pagination";

const { Header, Content } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

const fetchDataFromAPI = async (setDetail, setLoading, setCount) => {
  setLoading(true);
  try {
    const res = await fetch(`https://api.enye.tech/v1/challenge/records`);
    const data = await res.json();
    setDetail(data.records.profiles)
    setCount(data.size)
  } catch (e) {
    message.error(e.message)
  }
  setLoading(false)
}

const App = () => {
  const [trxDetail, setTrxDetail] = useState({
    details: [],
    count: 0,
    isLoading: false,
  })
  const [page, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("search")
  const [search, setSearch] = useState("")

  const setDetail = (details) => setTrxDetail(trxDetail => ({ ...trxDetail, details }));
  const setCount = (count) => setTrxDetail(trxDetail => ({ ...trxDetail, count }));
  const setLoading = (loadingState) => setTrxDetail(trxDetail => ({ ...trxDetail, isLoading: loadingState }));

  useEffect(() => {
    fetchDataFromAPI(setDetail, setLoading, setCount)
  }, [])

  const handleSearchChange = (e) => {
    setFilter("search")
    setSearch(e.target.value);
    if (e.target.value.trim() !== "") setCurrentPage(1)
  }

  const paginate = (data) => {
    return data.filter((d, i) => i >= MAX_IN_PAGE * (page - 1) && i < MAX_IN_PAGE * page)
  }

  const filterBySearch = (data) => {
    const filteredData = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      for (let key in item) {
        if (item[key].toString().toLowerCase().includes(search.toLowerCase())) {
          filteredData.push(item);
          break;
        }
      }
    }

    return filteredData;
  }

  const filterByGender = (data, gender) => {
    return data.filter(d => d.Gender.toLowerCase() === gender);
  }

  const filterByPaymentMethod = (data, method) => {
    return data.filter(d => d.PaymentMethod.toLowerCase() === method);
  }

  const filterData = (data, type) => {
    switch (type) {
      case "male":
      case "female":
        return filterByGender(data, type);
      case "cc":
      case "money order":
      case "paypal":
      case "check":
        return filterByPaymentMethod(data, type);
      default:
        return filterBySearch(data);
    }
  }

  const { details, count, isLoading } = trxDetail;

  const menu = (
    <Menu onClick={e => setFilter(e.key)}>
      <SubMenu title="Gender">
        <Menu.Item key="male">Male</Menu.Item>
        <Menu.Item key="female">Female</Menu.Item>
      </SubMenu>
      <SubMenu title="Payment Method">
        {[...new Set(details.map(d => d.PaymentMethod.toLowerCase()))].map(
          menu => <Menu.Item key={menu}>{menu}</Menu.Item>
        )}
      </SubMenu>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header">
        <h1>ENYE</h1>
        <div className="search">
          <Search placeholder="Search..." allowClear value={search} onChange={handleSearchChange} enterButton />
        </div>
        <Dropdown.Button overlay={menu}>Filter By:</Dropdown.Button>
      </Header>
      <Layout className="main">
        <Content className="content">
          <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
            {count > 0 ? (
              paginate(filterData(details, filter)).map((detail, i) => <Card key={i} {...detail} />)
            ) : (
                <Col span="24" className="feedback">
                  { isLoading ? <Spin size="large" /> : <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 100,
                    }}
                    description={
                      <span>
                        No Transaction Data was Found. <a href="/">Refresh</a>
                      </span>
                    }
                  />}
                </Col>
              )}
          </Row>
          {count > 0 && (
            <div className="pagination">
              <Pagination
                total={count}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={MAX_IN_PAGE}
                onChange={page => setCurrentPage(page)}
                defaultCurrent={page}
              />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
