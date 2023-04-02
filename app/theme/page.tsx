const primary = [
  'text-primary-50',
  'text-primary-100',
  'text-primary-200',
  'text-primary-300',
  'text-primary-400',
  'text-primary-500',
  'text-primary-600',
  'text-primary-700',
  'text-primary-800',
  'text-primary-900',
  'text-primary-950',
]

export default function Page() {
  return (
    <main className="p-4 flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Lavender Snake Blog</h1>
      <section className="flex flex-row flex-wrap gap-2">
        <div className="bg-neutral-200 flex flex-col w-fit p-4 gap-2 rounded-md">
          <h2 className="text-2xl font-bold text-primary">Primary Colors</h2>
          <ul>
            {primary.map((primary, index) => {
              return (
                <li key={index} className={primary}>
                  {primary}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="bg-neutral-200 flex flex-col w-fit p-4 gap-2 rounded-md">
          <h2 className="text-2xl font-bold text-success">Success</h2>
          <ul>
            <li className="text-success">text-success</li>
            <li className="text-success-focus">text-success-focus</li>
            <li className="text-success-content">text-success-content</li>
            <li className="text-success-content-focus">
              text-success-content-focus
            </li>
          </ul>
          <div className="p-4 bg-success text-success-content hover:bg-success-focus hover:text-success-content-focus">
            Success. Hover me to check other state.
          </div>
        </div>
        <div className="bg-neutral-200 flex flex-col w-fit p-4 gap-2 rounded-md">
          <h2 className="text-2xl font-bold text-error">Error</h2>
          <ul>
            <li className="text-error">text-error</li>
            <li className="text-error-focus">text-error-focus</li>
            <li className="text-error-content">text-error-content</li>
            <li className="text-error-content-focus">
              text-error-content-focus
            </li>
          </ul>
          <div className="p-4 bg-error text-error-content hover:bg-error-focus hover:text-error-content-focus">
            Error. Hover me to check other state.
          </div>
        </div>
      </section>
    </main>
  )
}
