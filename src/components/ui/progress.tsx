export function Progress({ value }: { value: number }) {
  return <div className="h-2 w-full rounded bg-slate-100"><div className="h-2 rounded bg-primaryBlue" style={{ width: `${value}%` }} /></div>;
}
