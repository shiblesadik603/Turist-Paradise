import FlightIcon from "@mui/icons-material/Flight";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CommuteIcon from "@mui/icons-material/Commute";

/** Picks an icon for a ride option based on keywords in its "mode" label. */
export const getRideIcon = (mode = "") => {
  const lower = mode.toLowerCase();
  if (lower.includes("flight") || lower.includes("air")) return FlightIcon;
  if (lower.includes("bus")) return DirectionsBusIcon;
  if (lower.includes("train") || lower.includes("rail")) return TrainIcon;
  if (
    lower.includes("boat") ||
    lower.includes("launch") ||
    lower.includes("ship") ||
    lower.includes("trawler") ||
    lower.includes("ferry")
  )
    return DirectionsBoatIcon;
  if (
    lower.includes("cng") ||
    lower.includes("rickshaw") ||
    lower.includes("auto") ||
    lower.includes("bike") ||
    lower.includes("motorcycle")
  )
    return TwoWheelerIcon;
  if (lower.includes("jeep") || lower.includes("car") || lower.includes("microbus"))
    return DirectionsCarIcon;
  return CommuteIcon;
};
