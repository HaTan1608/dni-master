import React from "react";
import { Table, Empty} from "antd";
import { ExpandableConfig, FilterValue, GetRowKey, SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
// import empty from "../../assets/images/empty.svg";
import './styles.less';
import { TablePaginationConfig } from "antd/es/table/interface";

interface TableProps {
  dataSource?: Array<any>;
  columns?: any;
  bordered?: boolean;
  loading?: boolean | undefined | null;
  expandable?: ExpandableConfig<any>;
  rowKey?: string | GetRowKey<any>;
  footer?: any;
  pagination?: TablePaginationConfig | false;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>) => void;
}

const DTable: React.FC<TableProps & Record<string, any>> = ({
  dataSource,
  columns,
  bordered,
  loading,
  expandable,
  rowKey,
  footer,
  pagination,
  onChange,
  ...rest
}) => {
  const LOCALE_CONFIG = {
    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>Trống</span>} />
  };
  return (
    <Table
      rowKey={rowKey}
      expandable={expandable}
      locale={LOCALE_CONFIG}
      dataSource={dataSource}
      columns={columns}
      bordered={Boolean(bordered)}
      loading={Boolean(loading)}
      {...rest}
      pagination={pagination}
      footer={footer}
      onChange={onChange}
    />
  );
};

export default DTable;
