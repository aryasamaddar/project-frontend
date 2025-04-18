// import { OfferDetails } from "./utils/types";
import { Separator } from "@/components/ui/separator";
import { Wheat, FileText, ArrowLeftCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Offer } from "./Offer";
import { OfferDetails } from "./utils/types";
import { CardHeader } from "./ui/card";
interface OfferPreviewProps {
  offerDetails: OfferDetails;
  resetForm?: () => void;
}

export const OfferPreview: React.FC<OfferPreviewProps> = ({
  offerDetails,
  resetForm,
}) => {
  const validity = offerDetails.offerDuration
    ? parseInt(offerDetails.offerDuration, 10)
    : 0;
  return (
    <>
      <Button
        variant="ghost"
        className="mb-8 ml-2 mt-2 z-100 absolute top-20"
        onClick={() => resetForm && resetForm()}
      >
        <ArrowLeftCircle />
      </Button>
      <CardHeader className="flex flex-row justify-between bg-muted mb-8">
        <div className="flex items-center gap-3">
          <Wheat className="w-8 h-8" />
          <h1 className="text-2xl font-semibold">Crop Offer Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span>Offer ID: 1AD3ZF4</span>
        </div>
      </CardHeader>
      <div className="max-w-5xl mx-auto p-8">
        <Offer offerDetails={offerDetails} resetForm={resetForm} />
        {/* Footer */}
        <Separator className="bg-[#2a2f2a] my-8" />
        <div className="flex justify-between text-sm">
          <span>Generated on: {new Date().toLocaleDateString()}</span>
          <span>
            Valid until:{" "}
            {new Date(
              Date.now() + 1000 * 60 * 60 * 24 * validity
            ).toLocaleDateString()}
          </span>
        </div>
      </div>
    </>
  );
};
