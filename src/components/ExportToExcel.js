import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
  
    const exportToCSV = (apiData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(apiData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
  
    return (
        <Button variant="outlined" sx={{height:55}} fullWidth={true} onClick={(e) => exportToCSV(apiData, fileName)} > <FileDownloadIcon/> </Button>
    );
  };