import { RouteFoundDetails } from "./RouteFoundDetails";
import { NoRouteDetails } from "./NoRouteDetails";

/** Wraps the Directions result (or lack thereof) in the shared card styling. */
export const TravelDetailsPanel = ({ travelDetails }) => (
  <div
    style={{
      background: travelDetails.type === "no_route_found" ? "#fef2f2" : "#f7fafc",
      padding: "20px",
      borderRadius: "12px",
      border: `1px solid ${travelDetails.type === "no_route_found" ? "#fecaca" : "#e2e8f0"}`,
      marginBottom: "20px",
    }}
  >
    {travelDetails.type === "route_found" ? (
      <RouteFoundDetails travelDetails={travelDetails} />
    ) : (
      <NoRouteDetails travelDetails={travelDetails} />
    )}
  </div>
);
