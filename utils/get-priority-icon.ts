import { ChevronDownIcon, ChevronsUpIcon, ChevronUpIcon } from "lucide-vue-next";

export default function (priorityName: string) {
  switch (priorityName) {
    case PRIORITY_VALUES[PriorityTypes.LOW].name:
      return h(ChevronDownIcon, { size: 16 })
    case PRIORITY_VALUES[PriorityTypes.MEDIUM].name:
      return h(ChevronUpIcon, { size: 16 })
    case PRIORITY_VALUES[PriorityTypes.HIGH].name:
      return h(ChevronsUpIcon, { size: 16 })
    default: return ''
  }
}