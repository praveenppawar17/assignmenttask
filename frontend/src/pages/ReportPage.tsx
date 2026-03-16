export default function ReportPage() {
  const reportUrl = "http://localhost/";
    // const reportUrl = "http://127.0.0.1/"
    // const reportUrl = "http://localhost:5000/api/report"
  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Report</h2>

      <iframe
        src={reportUrl}
        title="Report"
        className="w-full h-[80vh] border rounded"
      />
    </div>
  );
}
