import { Col, Divider, Grid } from "antd"
import {
    IdcardOutlined,
    CreditCardOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    WomanOutlined,
    ManOutlined,
    PullRequestOutlined,
    SearchOutlined,
    MoneyCollectOutlined,
    BarcodeOutlined,
    AlertOutlined
} from "@ant-design/icons";
import Item from "./../Item/Item"

const BodyItem = (props) => {
    return (
        <Item {...props} size="lg" />
    )
}

const Card = ({
    FirstName,
    LastName,
    Gender,
    Latitude,
    Longitude,
    CreditCardNumber,
    CreditCardType,
    Email,
    DomainName,
    PhoneNumber,
    MacAddress,
    URL,
    UserName,
    LastLogin,
    PaymentMethod
}) => {
    const breakpoint = Grid.useBreakpoint();

    return (
        <Col className="gutter-row" span={((breakpoint.sm || breakpoint.xs || breakpoint.md) && !breakpoint.lg) ? 24 : 12}>
            <div className="card-container">
                <h2 className="card-header">{FirstName + " " + LastName}</h2>
                <div className="card-body">
                    <div>Map ({Latitude} and {Longitude})</div>
                    <ul>
                        <BodyItem title="Username" icon={UserOutlined} value={UserName} />
                        <BodyItem title="Email" icon={MailOutlined} value={Email} />
                        <BodyItem title="Phone" icon={PhoneOutlined} value={PhoneNumber} />
                        <BodyItem title="Gender" icon={Gender === "Male" ? ManOutlined : WomanOutlined} value={Gender} />
                        <BodyItem title="Domain" icon={PullRequestOutlined} value={DomainName} />
                        <BodyItem title="URL" icon={SearchOutlined} value={URL} />
                    </ul>
                </div>
                <ul className="card-footer">
                    <Item title="Card Number" icon={IdcardOutlined} value={CreditCardNumber} />
                    <Divider type="vertical" />
                    <Item title="Card Type" icon={CreditCardOutlined} value={CreditCardType} />
                    <Divider type="vertical" />
                    <Item title="Payment Method" icon={MoneyCollectOutlined} value={PaymentMethod} />
                    <Divider type="vertical" />
                    <Item title="Mac Address" icon={BarcodeOutlined} value={MacAddress} />
                    <Divider type="vertical" />
                    <Item title="Last Login" icon={AlertOutlined} value={LastLogin} />
                </ul>
            </div>
        </Col>
    )
}

export default Card
