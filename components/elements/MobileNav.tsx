import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { salesComponents, lettingsComponents, marketingComponents, adminComponents, templatesComponents } from "@/components/elements/element-data/nav-data"
import { JSX, SVGProps } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { DialogTitle } from "@radix-ui/react-dialog"

export default function MobileNav() {
  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-end px-4 md:px-6 lg:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent 
        side="right"
        className="w-full md:w-[400px]"
        >
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          <div className="grid gap-2 py-2 ">
            <div>
              <div className="mb-2 mt-2 text-xl font-medium flex justify-center items-center">
                Stelfort Ltd
            </div>
            <div className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="Stelfort Ltd"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
            </div>
            
            
            </div>
  

            <Accordion type="single" collapsible>
              <AccordionItem value="sales">
                <AccordionTrigger>Sales</AccordionTrigger>
                <AccordionContent>
                  <Section components={salesComponents} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="lettings">
                <AccordionTrigger>Lettings</AccordionTrigger>
                <AccordionContent>
                  <Section components={lettingsComponents} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="marketing">
                <AccordionTrigger>Marketing</AccordionTrigger>
                <AccordionContent>
                  <Section components={marketingComponents} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="admin">
                <AccordionTrigger>Admin</AccordionTrigger>
                <AccordionContent>
                  <Section components={adminComponents} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="templates">
                <AccordionTrigger>Templates</AccordionTrigger>
                <AccordionContent>
                  <Section components={templatesComponents} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function Section({ components }: { components: { title: string; href: string; description: string }[] }) {
  return (
    <div>
      {components.map((component) => (
        <Link
          key={component.title}
          href={component.href}
          className="flex w-full items-center py-2 text-base"
        >
          {component.title}
        </Link>
      ))}
    </div>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
