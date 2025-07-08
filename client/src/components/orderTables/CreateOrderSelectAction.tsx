import useAppStore from "@/store/mainStore";
import { Checkbox } from "../ui/checkbox";

const CreateOrderSelectAction = ({ row }: {row: any}) => {
  const { addSelectedRow, deleteSelectedRow } = useAppStore();
  const handleCheckChange = (value: any) => {
    console.log('reached here')
    if (value) {
      console.log(row.original)
      addSelectedRow({...row.original,quantity: 1});
    } else {
      deleteSelectedRow(row.original.id);
    }
    row.toggleSelected(!!value);
  };
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleCheckChange}
      aria-label="Select row"
      disabled={row.getValue("quantity") == 0}
    />
  );
};

export default CreateOrderSelectAction;
