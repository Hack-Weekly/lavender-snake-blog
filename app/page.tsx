export default function Home() {
  return (
    <main className="flex flex-col p-4 gap-2">
      <h1 className="text-3xl font-bold text-primary">Lavender Snake Blog</h1>
      <p className="p-4 w-fit bg-success text-success-content hover:bg-success-focus hover:text-success-content-focus">
        Success. Hover me to check other state.
      </p>
      <p className="p-4 w-fit bg-error text-error-content hover:bg-error-focus hover:text-error-content-focus">
        Error. Hover me to check other state.
      </p>
    </main>
  )
}
