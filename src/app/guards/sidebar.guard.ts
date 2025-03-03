import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class SidebarGuard implements CanActivate {
  constructor(private router: Router, private toaster: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const sidebar = JSON.parse(localStorage.getItem("sidebar") || "[]");

    // Function to extract all paths (including children)
    const extractPaths = (items: any[]): string[] => {
      let paths: string[] = [];

      items.forEach((item) => {
        if (item.path) {
          paths.push(item.path);
        }
        if (item.children && Array.isArray(item.children)) {
          paths = paths.concat(extractPaths(item.children)); // Recursively collect paths from children
        }
      });

      return paths;
    };

    // Extract all allowed paths (including nested children)
    const allowedPaths = extractPaths(sidebar);

    // Get the current route path
    const currentPath = state.url;

    if (allowedPaths.includes(currentPath)) {
      return true;
    }
    this.toaster.error("انت ليس معك تصريح للذهاب لهذه الصفحة");
    this.router.navigate(["/home"]); // Redirect to a safe page
    return false;
  }
}
