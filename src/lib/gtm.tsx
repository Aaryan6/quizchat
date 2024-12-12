import TagManager from "react-gtm-module";
const saveGTMEvents = ({
  eventAction,
  label,
  label1,
  label2,
  label3,
  label4,
}: {
  eventAction: string;
  label: string | null;
  label1: string | null;
  label2: string | null;
  label3: string | null;
  label4: string | null;
}) => {
  const tagManagerArgs = {
    gtmId: "GTM-TH4RWGG",
    dataLayer: {
      event: "codeyoung_sandbox",
      event_category: "codeyoung_sandbox",
      event_action: eventAction,
      event_label: label,
      event_label1: label1,
      event_label2: label2,
      event_label3: label3,
      event_label4: label4,
    },
  };
  TagManager.dataLayer(tagManagerArgs);
  TagManager.initialize(tagManagerArgs);
};
export default saveGTMEvents;
