import { Card, Timeline, Dropdown, Spinner, Label } from "flowbite-react";
import { useEffect, useState } from "react";

const deviceCardTheme = {
  root: {
    base: "absolute z-10 top-1 left-1 flex rounded-lg border border-purple-300 bg-white shadow-md w-[400px]",
    children: "flex h-full flex-col justify-center gap-4 p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};

const timelineTheme = {
  root: {
    direction: {
      horizontal: "items-base sm:flex",
      vertical: "relative border-l border-gray-200 dark:border-gray-700",
    },
  },
  item: {
    root: {
      horizontal: "relative mb-6 sm:mb-0",
      vertical: "mb-10 ml-6",
    },
    content: {
      root: {
        base: "mt-3 sm:pr-8",
      },
      body: {
        base: "mb-4 text-base font-normal text-gray-500 dark:text-gray-400",
      },
      time: {
        base: "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500",
      },
      title: {
        base: "text-lg font-semibold text-gray-900 dark:text-white",
      },
    },
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-purple-700 dark:bg-purple-700 sm:flex",
      marker: {
        base: {
          horizontal:
            "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-purple-700 dark:border-purple-900 dark:bg-purple-700",
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-purple-700 dark:border-purple-900 dark:bg-purple-700",
        },
        icon: {
          base: "h-3 w-3 text-cyan-600 dark:text-cyan-300",
          wrapper:
            "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-purple-900",
        },
      },
      vertical: "",
    },
  },
};

const fetchLocName = ({ latitude, longitude, token }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${token}`
      );

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        // handle data
        console.log(data.features[0].place_name);
        resolve(data.features[0].place_name);
      } else {
        reject(new Error(`HTTP Error ${response.status}`));
      }
    } catch (error) {
      reject(error);
    }
  });
};

const DeviceCard = (props) => {
  const locations = props.locations;
  let [currInfo, setCurrInfo] = useState("");
  let [prevInfo, setPrevInfo] = useState("");

  useEffect(() => {
    locations.length > 0 &&
      fetchLocName({
        latitude: locations[0].lat,
        longitude: locations[0].lon,
        token: props.token,
      }).then((data) => {
        setPrevInfo(data);
      });

    locations.length > 1 &&
      fetchLocName({
        latitude: locations[1].lat,
        longitude: locations[1].lon,
        token: props.token,
      }).then((data) => {
        setCurrInfo(data);
      });
  }, [locations, props.token, setCurrInfo]);

  return (
    <Card href="#" className="max-w-sm" theme={deviceCardTheme}>
      <div className="header">
        <p className="font-bold">{props.name}</p>
      </div>
      <Dropdown.Divider className="h-[1px] bg-gray-300" />
      <div className="timeline">
        <Timeline theme={timelineTheme.root}>
          {locations.length > 0 ? (
            <>
              {locations.length > 1 && (
                <Timeline.Item>
                  <Timeline.Point theme={timelineTheme.item.point} />
                  <Timeline.Content theme={timelineTheme.item.content}>
                    <Timeline.Time>{locations[1].time}</Timeline.Time>
                    <Timeline.Body>{currInfo}</Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              )}

              <Timeline.Item theme={timelineTheme.item.root}>
                <Timeline.Point theme={timelineTheme.item.point} />
                <Timeline.Content theme={timelineTheme.item.content}>
                  <Timeline.Time>{locations[0].time}</Timeline.Time>
                  <Timeline.Body>{prevInfo}</Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            </>
          ) : (
            <>
              <Spinner
                color="purple"
                className="self-center text-center "
                aria-label="Default status example"
              />
              <Label className="ml-4 text-center">Waiting for update...</Label>
            </>
          )}
        </Timeline>
      </div>
      <Dropdown.Divider className="h-[1px] bg-gray-300" />
      <div className="device-info">
        <p className="text-gray-500">Device ID</p>
        <p>{props.deviceId}</p>
      </div>
    </Card>
  );
};

export default DeviceCard;
