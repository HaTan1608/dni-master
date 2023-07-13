// import { CATEGORIES_MOCK } from "./json";
// import TableCate from "./TableCate";
import { Col } from "antd";
import { ComingSoon } from "src/components/comingSoon";
import CustomBreadcrumb from "src/components/layout/Breadcrumb";

const Dashboard = () => {
  
  /****************************START**************************/
  /*                         Life Cycle                      */


  /**************************** END **************************/


  /****************************START**************************/
  /*                          Function                       */

  /**************************** END **************************/


  /****************************START**************************/
  /*                         Component                       */

  const _renderContent = () => {
    return (
      <ComingSoon />
    )
  }
  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return (
    <div className='w-full h-full pl-4 pr-4'>
      <CustomBreadcrumb
        // rootPath="Quản trị người dùng"
        currentPath="Dashboard"
        // nameBtn="Thêm người dùng"
        // onClickButton={btnVisbleCreate}
      />
      <Col className='contentBody mt-3'>
        {_renderContent()}
      </Col>
    </div>

  );

  /**************************** END **************************/

};

export default Dashboard;
