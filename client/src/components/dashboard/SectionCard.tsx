import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

export function SectionCard() {
  return (
    <div className="grid grid-cols-4">
      <Card className="pb-12">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
