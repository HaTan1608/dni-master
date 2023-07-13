/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Row, Breadcrumb } from "antd";
import "./styles.less";
import ButtonTMS from "../buttons/ButtonTMS";

function CustomBreadcrumb(props: any) {
  const { rootPath, currentPath, nameBtn } = props;  

  /****************************START**************************/
  /*                         Life Cycle                      */

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  const btnVisbleCreate = (e: any) => {
    props.onClickButton && props.onClickButton(e);
  };

  /**************************** END **************************/

  /****************************START**************************/
  /*                      Return Component                   */
  
  return (
    <Row justify='space-between'>
        <Breadcrumb>
          <Breadcrumb.Item>{rootPath}</Breadcrumb.Item>
          {
            currentPath &&
            <Breadcrumb.Item className='text-sm font-medium text-ddv'>
                {currentPath}
            </Breadcrumb.Item>
          }
        </Breadcrumb>
        {
            nameBtn &&
            <ButtonTMS type="tms" icon='plus' onClick={btnVisbleCreate}>
                <span>{nameBtn}</span>
            </ButtonTMS>
        }
    </Row>
  );

  /**************************** END **************************/
}

export default CustomBreadcrumb;
