import { Checkbox } from "~/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/vue-table";
import DataTableColumnHeader from "~/components/task/table/TaskDataTableColumnHeader.vue";
import { Badge } from "~/components/ui/badge";
import getStatusIcon from "~/utils/get-status-icon";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return h(DataTableColumnHeader, {
        title: "Task",
        column,
      });
    },
    cell: ({ row }) => h("div", row.getValue("slug")),
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return h(
        DataTableColumnHeader,
        {
          title: "Date",
          column,
        },
        ["Date", h("div", { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", `${row.getValue("date")} ${row.original.time}`),
  },
  {
    accessorKey: "title",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Title" }),

    cell: ({ row }) => {
      return h("div", { class: "flex space-x-2" }, [
        h(
          "span",
          { class: "max-w-[500px] truncate font-medium" },
          row.getValue("title")
        ),
      ]);
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Category" }),

    cell: ({ row }) => {
      const category = row.getValue("category");
      return h(
        Badge,
        { variant: "outline", class: "rounded-sm bg-background" },
        [
          h("div", { class: "flex space-x-2" }, [
            getCategoryIcon(category.name, {
              className: "size-4",
            }),
            h("span", category.name),
          ]),
        ]
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return h(
        DataTableColumnHeader,
        {
          title: "Status",
          column,
        },
        ["Status", h("div", { class: "ml-2 h-4 w-4" })]
      ); // вместо div - добавить иконку
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return h("div", { class: "flex items-center space-x-2" }, [
        getStatusIcon(status.name),
        h("div", status.name),
      ]);
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return h(
        DataTableColumnHeader,
        {
          title: "Priority",
          column,
        },
        ["Priority", h("div", { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      return h("div", { class: "flex items-center space-x-1" }, [
        getPriorityIcon(priority.name),
        h("span", priority.name),
      ]);
    },
  },
];
