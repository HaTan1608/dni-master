import { Row, Col} from 'antd';
interface ColumnProps {
    data: Array<any> | [];
}

export const RenderColTable = (props: ColumnProps) => {
    const {
        data,
    } = props;

    return (
        <>
        {
            data.map((item,idx) => {
                return (
                    <Row key={idx}>
                        <Col span={item.icon ? 3 : 0}>
                            {
                                item.icon
                            }
                            
                        </Col>
                        <Col span={item.icon ? 21 : 24}>
                            {
                                item.name &&
                                <span>{item.name}</span>
                            }
                        </Col>
                        
                    </Row>
                );
            })
        }
        </>
    )
}