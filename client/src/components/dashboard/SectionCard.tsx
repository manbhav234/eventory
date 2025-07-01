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
            ₹{value}
          </CardTitle>
        </CardHeader>
      </Card>
  )
}
export default SectionCard;
