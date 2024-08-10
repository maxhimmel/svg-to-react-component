export function Toast({ message }: { message: string }) {
  return (
    <div className="toast toast-top toast-end transition">
      <div className="alert alert-success font-sans">
        <span>{message}</span>
      </div>
    </div>
  );
}
