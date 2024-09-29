import PropTypes from "prop-types";
import { Label } from "@/components/ui/label.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { filterOptions } from "@/utils/index.jsx";
import { Button } from "@/components/ui/button.jsx";
import {Fragment} from "react";

ProductFilter.propTypes = {
    filters: PropTypes.object,
    handleFilter: PropTypes.func,
}

function ProductFilter({ filters, handleFilter }) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold h-[36px] flex items-center">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold">{keyItem.toUpperCase()}</h3>
                                <Button variant="outline" className="h-[24px] p-2" onClick={() => handleFilter(keyItem)}>Reset</Button>
                            </div>
                            <div className="grid gap-2 mt-5">
                                {filterOptions[keyItem].map((option) => (
                                    <Label className="flex font-medium items-center gap-2 " key={option.id}>
                                        <Checkbox
                                            checked={
                                                Object.keys(filters).length > 0 &&
                                                filters[keyItem] &&
                                                filters[keyItem].includes(option.id)
                                            }
                                            onCheckedChange={() => handleFilter(keyItem, option.id)}
                                        />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;