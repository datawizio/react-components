export default {
  columns: [
    {
      dataIndex: "status",
      default_visible: true,
      dtype: "string",
      key: "status",
      parent_key: null,
      title: "STATUS",
    },
    {
      dataIndex: "Ravil",
      default_visible: true,
      dtype: "object",
      key: "Ravil",
      parent_key: null,
      title: "Ravil",
      max_value: 7,
    },
    {
      dataIndex: "Olena",
      default_visible: true,
      dtype: "object",
      key: "Olena",
      parent_key: null,
      title: "Olena",
      max_value: 12,
    },
    {
      dataIndex: "Maria",
      default_visible: true,
      dtype: "object",
      key: "Maria",
      parent_key: null,
      title: "Maria",
      max_value: 8,
    },
    {
      dataIndex: "Ermek",
      default_visible: true,
      dtype: "object",
      key: "Ermek",
      parent_key: null,
      title: "Ermek",
      max_value: 14,
    },
  ],
  dataSource: [
    {
      key: "new",
      status: "STATUS_NEW",
      Ravil: {
        dtype: "bar",
        value: 7,
      },
      Olena: {
        dtype: "bar",
        value: 4,
      },
      Maria: {
        dtype: "bar",
        value: 3,
      },
      Ermek: {
        dtype: "bar",
        value: 7,
      },
    },
    {
      key: "open",
      status: "STATUS_OPEN",
      Ravil: {
        dtype: "bar",
        value: 5,
      },
      Olena: {
        dtype: "bar",
        value: 8,
      },
      Maria: {
        dtype: "bar",
        value: 6,
      },
      Ermek: {
        dtype: "bar",
        value: 0,
      },
    },
    {
      key: "in_progress",
      status: "STATUS_IN_PROGRESS",
      Ravil: {
        dtype: "bar",
        value: 1,
      },
      Olena: {
        dtype: "bar",
        value: 12,
      },
      Maria: {
        dtype: "bar",
        value: 8,
      },
      Ermek: {
        dtype: "bar",
        value: 3,
      },
    },
    {
      key: "done",
      status: "STATUS_DONE",
      Ravil: {
        dtype: "bar",
        value: 5,
      },
      Olena: {
        dtype: "bar",
        value: 7,
      },
      Maria: {
        dtype: "bar",
        value: 4,
      },
      Ermek: {
        dtype: "bar",
        value: 14,
      },
    },
    {
      key: "tasks_qty",
      status: "TASKS_QTY",
      Ravil: {
        dtype: "number_range",
        value: 7, // = max_value
      },
      Olena: {
        dtype: "number_range",
        value: 12, // = max_value
      },
      Maria: {
        dtype: "number_range",
        value: 8, // = max_value
      },
      Ermek: {
        dtype: "number_range",
        value: 14, // = max_value
      },
    }
  ]
};