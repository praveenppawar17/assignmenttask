export default function ReportPage() {
  const reportUrl = "http://4.224.74.152/"
  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Report</h2>

      <iframe
        src={reportUrl}
        title="Report"
        className="w-full h-[80vh] border rounded box-border"
      />
    </div>
  );
}

