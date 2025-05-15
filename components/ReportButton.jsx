import { Button, message } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReportButton = ({ transactions = [] }) => {
  const handleGeneratePDF = () => {
    const input = document.getElementById('report-content'); // Rapor içeriği için bir div ekleyin

    if (!input) {
      message.warning("Rapor içeriği bulunamadı");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("bütçe-raporu.pdf");

      message.success("Rapor başarıyla oluşturuldu");
    });
  };

  return (
    <Button 
      type="primary" 
      onClick={handleGeneratePDF}
    >
      Rapor Oluştur
    </Button>
  );
};

export default ReportButton;