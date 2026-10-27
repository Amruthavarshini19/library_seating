import EmptyState from "../../components/EmptyState/EmptyState"
import Skeleton from "../../components/Skeleton/Skeleton"
import ErrorState from "../../components/ErrorState/ErrorState"
import FormField from "../../components/FormField/FormField"
import "./DevStates.css"
export default function DevStates() {
  return (
    <>
      <header className="page-header">
        <div>
          <h1>System states</h1>
          <p>Reusable product states</p>
        </div>
      </header>
      <div className="dev-states">
        <section className="card">
          <EmptyState
            title="No seat reserved today"
            message="Pick a free seat and a time slot to reserve it."
          />
        </section>
        <section className="card">
          <EmptyState
            title="No books borrowed"
            message="Search the catalogue to borrow your first book."
          />
        </section>
        <section className="card">
          <EmptyState
            title="You are all caught up"
            message="New alerts will show up here."
          />
        </section>
        <section className="card">
          <h2>Loading</h2>
          <Skeleton lines={5} />
        </section>
        <section className="card">
          <ErrorState
            message="Check your connection and try again."
            onRetry={() => {}}
          />
        </section>
        <section className="card">
          <h2>Form error</h2>
          <FormField
            label="Register number"
            name="dev-reg"
            error="Register number not found"
            value="000000"
            readOnly
          />
        </section>
      </div>
    </>
  )
}
