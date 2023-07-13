import React from "react";
import { Table, Empty } from "antd";
import { ExpandableConfig, FilterValue, GetRowKey, SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import './styles.less';
import { TablePaginationConfig } from "antd/es/table/interface";
import { PAGE_SIZE_DEFAULT } from "src/constants";

interface TableProps {
  dataSource?: Array<any> | [];
  columns?: any;
  bordered?: boolean;
  paging?: any;
  loading?: boolean | undefined | null;
  isRowLight?: boolean | undefined | null;
  expandable?: ExpandableConfig<any>;
  rowKey?: string | GetRowKey<any>;
  footer?: any;
  pagination?: boolean | false;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>) => void;
}

const CustomTable: React.FC<TableProps & Record<string, any>> = ({
  dataSource,
  columns,
  bordered,
  paging,
  loading,
  isRowLight,
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
      pagination={pagination ? {
        current: paging && paging.curentpage ? +paging.curentpage : 1,
        showSizeChanger: true,
        defaultPageSize: PAGE_SIZE_DEFAULT,
        total: paging && paging.totalPage ? +paging.totalPage : 0,
        showTotal: total => `Tổng ${total} `,
        locale: {
          items_per_page: 'Trang',
        },
      } : pagination}
      rowClassName={(r, idx) =>
        isRowLight && idx % 2 !== 0 ? "bg-neutral_color_1_9" : "bg-neutral_color_1_8"
      }
      footer={footer}
      onChange={onChange}
    />
  );
};

export default CustomTable;
