import { Layout, Row } from "antd";
import { HeartFilled } from "@ant-design/icons";
import moment from "moment";
import "./styles.less";
import { textVersion } from "src/utils/text";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter>
      <Row
        className="just mt-20"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div
          className="copyright"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          © {moment().format('YYYY')}, made with
          {<HeartFilled />} by
          <a href="#pablo" className="font-weight-bold" target="_blank">
            NHẤT TÍN
          </a>
          for a better web. {textVersion}
        </div>
        {/* <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                    NHẤT TÍN  
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </Col> */}
      </Row>
    </AntFooter>
  );
}

export default Footer;
