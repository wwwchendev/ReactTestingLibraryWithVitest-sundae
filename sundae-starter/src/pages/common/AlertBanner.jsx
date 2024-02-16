import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message, variant }) {
  const alertMessage =
    message || "發生意料之外的問題，請稍後再試。";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} >
      {alertMessage}
    </Alert>
  );
}