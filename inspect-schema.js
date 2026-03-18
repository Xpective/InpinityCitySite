const endpoint = "http://127.0.0.1:8787/graphql";

const query = `
query InspectSchema {
  plotStatsType: __type(name: "PlotStats") {
    name
    fields { name }
  }
  plotDistrictType: __type(name: "PlotDistrict") {
    name
    fields { name }
  }
  cityConfigStateType: __type(name: "CityConfigState") {
    name
    fields { name }
  }
  plotStatusInfoType: __type(name: "PlotStatusInfo") {
    name
    fields { name }
  }
}
`;

async function main() {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

main().catch(console.error);
