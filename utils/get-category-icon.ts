import { CategoryTypes } from "@/utils/constants";
import { h } from "vue";

export function getCategoryIcon(
  categoryName?: string,
  {
    as = "img",
    urlKey = "src",
    className,
  }: {
    as?: string;
    urlKey?: string;
    className?: string;
  } = {}
) {
  let imgUrl = "images/categories/";
  switch (categoryName) {
    case CATEGORY_VALUES[CategoryTypes.ACCIDENT].name:
      imgUrl += "accident.png";
      break;
    // case CATEGORY_VALUES[CategoryTypes.AMBULANCE].name:
    //   imgUrl += "ambulance.png";
    //   break;
    case CATEGORY_VALUES[CategoryTypes.FIRE].name:
      imgUrl += "fire.png";
      break;
    // case CATEGORY_VALUES[CategoryTypes.POLICE].name:
    //   imgUrl += "police.png";
    //   break;
    // case CATEGORY_VALUES[CategoryTypes.ROAD].name:
    //   imgUrl += "road.png";
    //   break;
    case CATEGORY_VALUES[CategoryTypes.COMMUNICATIONS].name:
      imgUrl += "communications.png";
      break;
    // case CATEGORY_VALUES[CategoryTypes.CRASH].name:
    //   imgUrl += "crash.png";
    //   break;
    case CATEGORY_VALUES[CategoryTypes.ENERGETICS].name:
      imgUrl += "lightning.png";
      break;
    case CATEGORY_VALUES[CategoryTypes.OIL].name:
      imgUrl += "oil.png";
      break;
    case CATEGORY_VALUES[CategoryTypes.BATTERIES].name:
      imgUrl += "batteries.png";
      break;
    // case CATEGORY_VALUES[CategoryTypes.SNOW].name:
    //   imgUrl += "snow.png";
    //   break;
    default:
      imgUrl += "default.png";
  }

  return h(as, {
    [urlKey]: imgUrl,
    class: className,
  });
}
