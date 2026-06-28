import {
  Banknote,
  Calendar,
  ChartBar,
  CheckSquare,
  Fingerprint,
  Forklift,
  Gauge,
  GraduationCap,
  Kanban,
  LayoutDashboard,
  ListTodo,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  ReceiptText,
  Server,
  ShoppingBag,
  SquareArrowUpRight,
  Users,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

/*export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        id: "default",
        title: "Default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        id: "crm",
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        id: "finance",
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        id: "analytics",
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: Gauge,
      },
      {
        id: "productivity",
        title: "Productivity",
        url: "/dashboard/productivity",
        icon: ListTodo,
      },
      {
        id: "ecommerce",
        title: "E-commerce",
        url: "/dashboard/ecommerce",
        icon: ShoppingBag,
      },
      {
        id: "academy",
        title: "Academy",
        url: "/dashboard/academy",
        icon: GraduationCap,
      },
      {
        id: "logistics",
        title: "Logistics",
        url: "/dashboard/logistics",
        icon: Forklift,
      },
      {
        id: "infrastructure",
        title: "Infrastructure",
        url: "/dashboard/infrastructure",
        icon: Server,
        badge: "new",
      },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        id: "email",
        title: "Email",
        url: "/dashboard/mail",
        icon: Mail,
      },
      {
        id: "chat",
        title: "Chat",
        url: "/dashboard/chat",
        icon: MessageSquare,
      },
      {
        id: "calendar",
        title: "Calendar",
        url: "/dashboard/calendar",
        icon: Calendar,
      },
      {
        id: "kanban",
        title: "Kanban",
        url: "/dashboard/kanban",
        icon: Kanban,
      },
      {
        id: "tasks",
        title: "Tasks",
        url: "/dashboard/tasks",
        icon: CheckSquare,
        badge: "new",
      },
      {
        id: "invoice",
        title: "Invoice",
        url: "/dashboard/invoice",
        icon: ReceiptText,
      },
      {
        id: "users",
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        id: "roles",
        title: "Roles",
        url: "/dashboard/roles",
        icon: Lock,
      },
      {
        id: "authentication",
        title: "Authentication",
        icon: Fingerprint,
        subItems: [
          { id: "auth-login-v1", title: "Login v1", url: "/auth/v1/login", newTab: true },
          { id: "auth-login-v2", title: "Login v2", url: "/auth/v2/login", newTab: true },
          { id: "auth-register-v1", title: "Register v1", url: "/auth/v1/register", newTab: true },
          { id: "auth-register-v2", title: "Register v2", url: "/auth/v2/register", newTab: true },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Legacy",
    items: [
      {
        id: "legacy-dashboards",
        title: "Dashboards",
        subItems: [
          { id: "legacy-default", title: "Default V1", url: "/dashboard/default-v1" },
          { id: "legacy-crm", title: "CRM V1", url: "/dashboard/crm-v1" },
          { id: "legacy-finance", title: "Finance V1", url: "/dashboard/finance-v1" },
          { id: "legacy-analytics", title: "Analytics V1", url: "/dashboard/analytics-v1" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Misc",
    items: [
      {
        id: "others",
        title: "Others",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        badge: "soon",
        disabled: true,
      },
    ],
  },
];*/
export const sidebarItems: NavGroup = [
  {
    id: 1,
    label: "Dashboards & Analytics",
    items: [
      {
        id: "overview",
        title: "Overview",
        url: "/dashboard/overview",
      },
      {
        id: "analytics",
        title: "Financial Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
  {
    id: 2,
    label: "User & Account Management",
    items: [
      {
        id: "users",
        title: "Users Management",
        url: "/dashboard/users",
        subItems: [
          {
            id: "new",
            title: "Add New User",
            url: "/dashboard/users/new",
          },
        ],
      },
      {
        id: "cardholders",
        title: "Cardholders",
        url: "/dashboard/users/cardholders",
      },
      {
        id: "merchants",
        title: "Merchants",
        url: "/dashboard/users/merchants",
      },
      {
        id: "agents",
        title: "Agents & Partners",
        url: "/dashboard/users/agents",
      },
      {
        id: "staff",
        title: "Staff",
        url: "/dashboard/users/Staff",
      },
    ],
  },
  {
    id: 3,
    label: "Core Banking & Ledger",
    items: [
      {
        id: "wallets",
        title: "Wallets & Accounts",
        url: "/dashboard/wallets",
      },
      {
        id: "transactions",
        title: "Transactions Ledger",
        url: "/dashboard/wallets/transactions",
      },
      {
        id: "settlements",
        title: "Settlements & Clearing",
        url: "/dashboard/wallets/settlements",
      },
      {
        id: "depoist",
        title: "Depoist Requsets",
        url: "/dashboard/wallets/depoists",
      },
    ],
  },
  {
    id: 4,
    label: "Issuing & Acquiring",
    items: [
      {
        id: "cards",
        title: "Card Management",
        subItems: [
          {
            id: "link",
            title: "Link With Wallet",
            url: "/dashboard/cards/link",
          },
          {
            id: "issue",
            title: "Iusse New Card",
            url: "/dashboard/cards/iusse",
          },
          {
            id: "stock",
            title: "Cards Stock",
            url: "/dashboard/cards/stock",
          },
        ],
      },
      {
        id: "card_transactions",
        title: "Card Transactions",
        url: "/dashboard/cards/transactions",
      },
    ],
  },
  {
    id: 5,
    label: "Risk, Compliance & Fraud",
    items: [
      {
        id: "compliance",
        title: "AML / Compliance",
        url: "/dashboard/compliance",
      },
      {
        id: "risks",
        title: "Fraud & Risk Radar",
        url: "/dashboard/risks",
      },
      {
        id: "block",
        title: "Block Accounts",
        url: "/dashboard/block",
      },
    ],
  },
  {
    id: 6,
    label: "Operations & Support",
    items: [
      {
        id: "support",
        title: "Support Tickets",
        url: "/dashboard/support",
      },
      {
        id: "disputes",
        title: "Disputes & Chargebacks",
        url: "/dashboard/disputes",
      },
    ],
  },
  {
    id: 7,
    label: "System Settings & Access Control",
    items: [
      {
        id: "roles_permissions",
        title: "Roles & Permissions",
        subItems: [
          {
            id: "roles",
            title: "Roles",
            url: "/dashboard/roles",
          },
          {
            id: "permissions",
            title: "Permissions",
            url: "/dashboard/permissions",
          },
        ],
      },
      {
        id: "fees",
        title: "Fee & Commission",
        url: "/dashboard/fees",
      },
      {
        id: "settings",
        title: "Genreal Settings",
        url: "/dashboard/settings",
      },
    ],
  },
];
