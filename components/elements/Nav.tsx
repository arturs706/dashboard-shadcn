"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const salesComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Sales Properties",
    href: "/sales/residential/properties",
    description:
      "A list of properties for sale."
  },
  {
    title: "Vendors",
    href: "/sales/vendors",
    description:
      "A list of vendors who have properties for sale."
  },
  {
    title: "Buyers",
    href: "/sales/residential/buyers",
    description:
      "A list of buyers who are interested in buying properties."
  },
  {
    title: "Solicitors",
    href: "/sales/solicitors",
    description: "A list of solicitors for the sale of properties."
  }
]

const lettingsComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Properties",
    href: "/lettings/residential/properties",
    description:
      "A list of properties for letting."
  },
  {
    title: "Landlords",
    href: "/lettings/landlords",
    description:
      "A list of landlords who have properties for letting."
  },
  {
    title: "Tenants",
    href: "/lettings/tenants/residential",
    description: "A list of tenants who are interested in renting properties."
  },
  {
    title: "Suppliers",
    href: "/lettings/suppliers",
    description: "A list of suppliers who provide services to the letting of properties."
  },
  {
    title: "Lettings",
    href: "/lettings/residential",
    description: "A list of lettings for residential properties."
  }
  
]

const marketingComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Marketing Properties",
    href: "/marketing/properties",
    description:
      "A list of properties for marketing."
  },
  
]

const adminComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Users",
    href: "/admin/users",
    description:
      "A list of users who have access to the system."
  }
]

const templatesComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Templates",
    href: "/templates",
    description:
      "A list of templates for the system."
  }
]

function Nav() {
  return (
    <div className="pt-4 flex w-full items-center justify-center">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[600px] lg:w-[750px] lg:grid-cols-[1fr_0.8fr_0.8fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-center items-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-2 text-xl font-medium">
                      Stelfort Ltd
                    </div>
                    <Image src="/logo.svg" alt="Stelfort Ltd" width={120} height={120} />
                  </a>
                </NavigationMenuLink>
              </li>
              <div className="space-y-1">
                <ListItem href="/" title="Dashboard">A central hub that provides an overview of key metrics and activities.</ListItem>
                <ListItem href="/diary" title="My Diary">A personal diary for managing appointments, events, and reminders.</ListItem>
                <ListItem href="/diary/branch" title="Branch Diary">A shared diary for managing appointments and tasks specific to the branch.</ListItem>
                <ListItem href="/tasks" title="My Tasks">A list of tasks assigned to you, helping track your to-dos and deadlines.</ListItem>
              </div>
              <div className="space-y-1">
                <ListItem href="/addressbook" title="Address Book">A directory for managing contacts and important addresses.</ListItem>
                <ListItem href="/alerts" title="Alerts">A section for notifications and important alerts that require attention.</ListItem>
                <ListItem href="/reports" title="Reports">A space to view and generate reports on various activities and metrics.</ListItem>
                <ListItem href="/finance" title="Finance">A section to manage and track financial information, transactions, and reports.</ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Sales</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {salesComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


    
        <NavigationMenuItem>
          <NavigationMenuTrigger>Lettings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {lettingsComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Marketing</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {marketingComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {adminComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {templatesComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Nav;
