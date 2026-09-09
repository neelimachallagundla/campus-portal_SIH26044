import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function PowerBIReport({ report }) {
  if (!report) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <PowerBIEmbed
      embedConfig={{
        type: "report",
        id: report.reportId,
        embedUrl: report.embedUrl,
        accessToken: report.accessToken,
        tokenType: models.TokenType.Embed,

        settings: {
          panes: {
            filters: {
              visible: true,
              expanded: false,
            },
            pageNavigation: {
              visible: true,
            },
          },
          background: models.BackgroundType.Transparent,
        },
      }}
      eventHandlers={
        new Map([
          [
            "loaded",
            () => console.log("Power BI loaded"),
          ],
          [
            "rendered",
            () => console.log("Power BI rendered"),
          ],
          [
            "error",
            (event) => {
              console.error("Power BI error:", event.detail);
            },
          ],
        ])
      }
      cssClassName="w-full h-[650px]"
    />
  );
}

export default PowerBIReport;