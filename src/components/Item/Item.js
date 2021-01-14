import { Tooltip } from "antd"
import {
    QuestionOutlined,
} from "@ant-design/icons";
import className from "classnames";

const Item = ({ title = "", icon: Icon = QuestionOutlined, value = "", size = "sm" }) => {
    return (
        <li className="footer-item">
            <Tooltip title={title}>
                <div className={className("footer-item-inner", {
                    "footer-item-inner-lg": size === "lg"
                })}>
                    <Icon />
                    <span>{value}</span>
                </div>
            </Tooltip>
        </li>
    )
}

export default Item
