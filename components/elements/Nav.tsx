"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { adminComponents, administrativeTools, lettingsComponents, marketingComponents, personalTools, salesComponents, templatesComponents } from "./element-data/nav-data"
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';

// function Nav() {
//   return (
//     <div className="pt-4  w-full items-center justify-center hidden lg:flex">
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Home</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-2 p-4 md:w-[600px] lg:w-[750px] lg:grid-cols-[1fr_0.8fr_0.8fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-center items-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     <div className="mb-2 mt-2 text-xl font-medium">
//                       Stelfort Ltd
//                     </div>
//                     <Image 
//                       src="/logo.svg" 
//                       alt="Stelfort Ltd" 
//                       width={120} 
//                       height={120} 
//                       style={{ width: "auto", height: "auto" }}
//                     />
//                   </a>
//                 </NavigationMenuLink>
//               </li>
              
//               <div className="space-y-1">
//                 {personalTools.map((tool) => (
//                   <li key={tool.href}>
//                     <ListItem href={tool.href} title={tool.title}>
//                       {tool.description}
//                     </ListItem>
//                   </li>
//                 ))}
//               </div>
   
//               <div className="space-y-1">
//                 {administrativeTools.map((tool) => (
//                   <li key={tool.href}>
//                     <ListItem href={tool.href} title={tool.title}>
//                       {tool.description}
//                     </ListItem>
//                   </li>
//                 ))}
//               </div>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Sales</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {salesComponents.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>


    
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Lettings</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {lettingsComponents.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Marketing</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {marketingComponents.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {adminComponents.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>


//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {templatesComponents.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//       </NavigationMenuList>
//     </NavigationMenu>
//     </div>
//   )
// }
function Nav() {
  return (
    <div className="pt-4 w-full items-center justify-center hidden lg:flex">
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
                      <Image 
                        src="/logo.svg" 
                        alt="Stelfort Ltd" 
                        width={120} 
                        height={120} 
                        style={{ width: "auto", height: "auto" }}
                      />
                    </a>
                  </NavigationMenuLink>
                </li>
                
                <div className="space-y-1">
                  {personalTools.map((tool) => (
                    <ListItem key={tool.href} href={tool.href} title={tool.title}>
                      {tool.description}
                    </ListItem>
                  ))}
                </div>

                <div className="space-y-1">
                  {administrativeTools.map((tool) => (
                    <ListItem key={tool.href} href={tool.href} title={tool.title}>
                      {tool.description}
                    </ListItem>
                  ))}
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


          {/* Add more NavigationMenuItems as needed */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
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
