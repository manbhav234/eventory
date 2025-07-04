import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const SectionCard = ({title, value}: {title: string, value: number}) => {
  return (
      <Card className="pb-12">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {!title.includes("Orders") ? "₹" : null}{value.toLocaleString(navigator.language, { minimumFractionDigits: title.includes("Orders") ? 0 : 2 })}
          </CardTitle>
        </CardHeader>
      </Card>
  )
}
export default SectionCard;
