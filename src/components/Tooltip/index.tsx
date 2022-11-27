import React from "react";

type Props = {
  location: {
    city: string;
    country: string;
    isp: string;
    nodeId: string;
    version: string;
    ip: string;
    uptime: number;
    stake: { networkShare: number; total: string };
    latLon: { lat: string; lon: string };
  };
};

export const TooltipBody = ({ location }: Props) => {
  return (
    <div className="tooltip">
      <div>{location.nodeId}</div>
      <div>
        {location.city} / {location.country}
      </div>
      <div>{location.ip}</div>
      <div>{location.isp}</div>
      <div>Network share: {location.stake.networkShare}%</div>
    </div>
  );
};
