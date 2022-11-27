import { useEffect, useState } from "react";
import { Locations } from "../data/locations";
import { isEmpty } from "../utils/isEmpty";
import { useFetch } from "./useFetch";

export const useGetAVAXLocationData = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [url, setUrl] = useState(
    `/v2/network/mainnet/staking/validations?status=active`
  );
  const { data, error } = useFetch(`https://api-beta.avascan.info${url}`);

  useEffect(() => {
    if (data) {
      const locationArray: Locations[] = [];
      data.items.forEach((e: any) => {
        if (e.node && !isEmpty(e.node.location)) {
            if(e.node.location.city !== null || e.node.location.country !== null){
                console.log(e.node.location);
                const nodeInfo = {
                  city: e.node.location.city,
                  country: e.node.location.country,
                  isp: e.node.isp,
                  nodeId: e.nodeId,
                  version: e.node.version,
                  ip: e.node.ip,
                  uptime: e.node.avgUptime,
                  stake: {networkShare: e.stake.networkShare, total: e.stake.total}
                };
                locationArray.push(nodeInfo);
              }
            }
      });
      setLocations([...locations, ...locationArray]);
      if (data.link && data.link.next) {
        setUrl(data.link.next);
        console.log(data.link.next);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: useGetAVAXLocationData.tsx ~ line 29 ~ useGetAVAXLocationData ~ error",
      error
    );
  }, [error]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: useGetAVAXLocationData.tsx ~ line 26 ~ useGetAVAXLocationData ~ locations",
      locations
    );
  }, [locations]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: useGetAVAXLocationData.tsx ~ line 33 ~ useGetAVAXLocationData ~ url",
      url
    );
  }, [url]);
};
