import { CircleIcon, CircleCheckIcon, ClockIcon, CircleXIcon, CircleHelpIcon } from "lucide-vue-next";
import { StatusTypes } from "~/utils/constants";

export default function (statusName: string, color?) {
  switch (statusName) {
    case STATUS_VALUES[StatusTypes.TODO].name:
      return h(CircleIcon, { color, size: '16' })
    case STATUS_VALUES[StatusTypes.IN_PROGRESS].name:
      return h(ClockIcon, { color, size: '16' })
    case STATUS_VALUES[StatusTypes.DONE].name:
      return h(CircleCheckIcon, { color, size: '16' })
    case STATUS_VALUES[StatusTypes.CANCELED].name:
      return h(CircleXIcon, { color, size: '16' })
    case STATUS_VALUES[StatusTypes.BACKLOG].name:
      return h(CircleHelpIcon, { color, size: '16' })
    default: return ''
  }
}