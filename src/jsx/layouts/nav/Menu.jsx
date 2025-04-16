export const MenuList = [
	//Dashboard
	{
		title: "Dashboard",
		classsChange: "mm-collapse",
		iconStyle: <i className="material-symbols-outlined">home</i>,
		to: "dashboard-dark",
		// content: [
		//   //   {
		//   //     title: "Dashboard Light",
		//   //     to: "dashboard",
		//   //   },
		//   {
		//     title: "Dashboard Dark",
		//     to: "dashboard-dark",
		//   },
		// ],
	},

	{
		title: "Registration",
		classsChange: "mm-collapse",
		iconStyle: <i className="material-symbols-outlined">business</i>,
		content: [
			{
				title: "Company Requirements",
				to: "company-enquiries",
			},
			// {
			//   title: "Company Detail",
			//   to: "company-detail",
			// },
			{
				title: "Add New Enquiry",
				to: "add-enquiry",
			},
			{
				title: "Registered Companies",
				to: "registered-companies",
			},
			{
				title: "Add New Company",
				to: "add-company",
			},
		],
	},

	{
		title: "Trainer",
		classsChange: "mm-collapse",
		iconStyle: <i className="material-symbols-outlined">people</i>,
		content: [
			{
				title: "Trainer",
				to: "trainer",
			},
			// {
			//   title: "Trainer Detail",
			//   to: "trainer-detail",
			// },
			{
				title: "Add New Trainer",
				to: "add-trainer",
			},
			{
				title: "Add Event",
				to: "post-training",
			},
		],
	},
	{
		title: "Outbound Hotels",
		classsChange: "mm-collapse",
		iconStyle: <i className="material-symbols-outlined">hotel</i>,
		content: [
			{
				title: "Outbound Hotel",
				to: "hotel",
			},
			
			{
				title: "Add New Outbound Hotel",
				to: "add-hotel",
			},
		],
	},

	{
		title: "Invoicing",
		classsChange: "mm-collapse",
		iconStyle: <i className="material-symbols-outlined">receipt</i>,
		content: [
			{
				title: "Finance",
				to: "finance",
			},
			{
				title: "Payment",
				to: "payment",
			},
			{
				title: "Invoices",
				to: "invoice",
			},
			{
				title: "Add New Invoice",
				to: "add-invoice",
			},
		// {
		// 			title: "Old Invoice", 
		// 			to: "old-invoice",
		// 		},
		],
	},
	// {
	//   title: "File Manager",
	//   classsChange: "mm-collapse",
	//   iconStyle: <i className="material-icons">folder</i>,
	//   content: [
	//     {
	//       title: "File Manager",
	//       to: "file-manager",
	//     },
	//     // {
	//     //   title: "User",
	//     //   to: "user",
	//     // },
	//     // {
	//     //   title: "Calendar",
	//     //   to: "calendar",
	//     // },
	//     // {
	//     //   title: "Chat",
	//     //   to: "chat",
	//     // },
	//     {
	//       title: "Activity",
	//       to: "activity",
	//     },
	//   ],
	// },
	//Apps
	// {
	//   title: "Apps",
	//   classsChange: "mm-collapse",
	//   iconStyle: <i className="material-icons">app_registration </i>,
	//   content: [
	//     {
	//       title: "Profile",
	//       to: "app-profile",
	//     },
	//     {
	//       title: "Edit Profile",
	//       to: "edit-profile",
	//     },
	//     // {
	//     //   title: "Post Details",
	//     //   to: "post-details",
	//     // },
	//     // {
	//     //   title: "Email",
	//     //   //to: './',
	//     //   hasMenu: true,
	//     //   content: [
	//     //     {
	//     //       title: "Compose",
	//     //       to: "email-compose",
	//     //     },
	//     //     {
	//     //       title: "Index",
	//     //       to: "email-inbox",
	//     //     },
	//     //     {
	//     //       title: "Read",
	//     //       to: "email-read",
	//     //     },
	//     //   ],
	//     // },
	//     // {
	//     //   title: "Calendar",
	//     //   to: "app-calender",
	//     // },
	//     // {
	//     //     title: 'Shop',
	//     //     //to: './',
	//     //     hasMenu : true,
	//     //     content: [
	//     //         {
	//     //             title: 'Product Grid',
	//     //             to: 'ecom-product-grid',
	//     //         },
	//     //         {
	//     //             title: 'Product List',
	//     //             to: 'ecom-product-list',
	//     //         },
	//     //         {
	//     //             title: 'Product Details',
	//     //             to: 'ecom-product-detail',
	//     //         },
	//     //         {
	//     //             title: 'Order',
	//     //             to: 'ecom-product-order',
	//     //         },
	//     //         {
	//     //             title: 'Checkout',
	//     //             to: 'ecom-checkout',
	//     //         },
	//     //         {
	//     //             title: 'Invoice',
	//     //             to: 'ecom-invoice',
	//     //         },
	//     //         {
	//     //             title: 'Customers',
	//     //             to: 'ecom-customers',
	//     //         },
	//     //     ],
	//     // },
	//   ],
	// },
	// //Charts
	// {
	//   title: "Charts",
	//   classsChange: "mm-collapse",
	//   iconStyle: <i className="material-icons">assessment</i>,
	//   content: [
	//     {
	//       title: "RechartJs",
	//       to: "chart-rechart",
	//     },
	//     {
	//       title: "Chartjs",
	//       to: "chart-chartjs",
	//     },
	//     {
	//       title: "Sparkline",
	//       to: "chart-sparkline",
	//     },
	//     {
	//       title: "Apexchart",
	//       to: "chart-apexchart",
	//     },
	//   ],
	// },
	// //Boosttrap
	// {
	//     title: 'Bootstrap',
	//     classsChange: 'mm-collapse',
	//     iconStyle: <i className="material-icons">favorite</i>,
	//     content: [
	//         {
	//             title: 'Accordion',
	//             to: 'ui-accordion',
	//         },
	//         {
	//             title: 'Alert',
	//             to: 'ui-alert',
	//         },
	//         {
	//             title: 'Badge',
	//             to: 'ui-badge',
	//         },
	//         {
	//             title: 'Button',
	//             to: 'ui-button',
	//         },
	//         {
	//             title: 'Modal',
	//             to: 'ui-modal',
	//         },
	//         {
	//             title: 'Button Group',
	//             to: 'ui-button-group',
	//         },
	//         {
	//             title: 'List Group',
	//             to: 'ui-list-group',
	//         },
	//         {
	//             title: 'Cards',
	//             to: 'ui-card',
	//         },
	//         {
	//             title: 'Carousel',
	//             to: 'ui-carousel',
	//         },
	//         {
	//             title: 'Dropdown',
	//             to: 'ui-dropdown',
	//         },
	//         {
	//             title: 'Popover',
	//             to: 'ui-popover',
	//         },
	//         {
	//             title: 'Progressbar',
	//             to: 'ui-progressbar',
	//         },
	//         {
	//             title: 'Tab',
	//             to: 'ui-tab',
	//         },
	//         {
	//             title: 'Typography',
	//             to: 'ui-typography',
	//         },
	//         {
	//             title: 'Pagination',
	//             to: 'ui-pagination',
	//         },
	//         {
	//             title: 'Grid',
	//             to: 'ui-grid',
	//         },
	//     ]
	// },
	// //plugins
	// {
	//     title:'Plugins',
	//     classsChange: 'mm-collapse',
	//     iconStyle : <i className="material-icons">extension </i>,
	//     content : [
	//         {
	//             title:'Select 2',
	//             to: 'uc-select2',
	//         },
	//         {
	//             title:'Noui Slider',
	//             to: 'uc-noui-slider',
	//         },
	//         {
	//             title:'Sweet Alert',
	//             to: 'uc-sweetalert',
	//         },
	//         {
	//             title:'Toastr',
	//             to: 'uc-toastr',
	//         },
	//         {
	//             title:'Light Gallery',
	//             to: 'uc-lightgallery',
	//         },
	//     ]
	// },
	//Widget
	//   {
	//     title: "Widget",
	//     iconStyle: <i className="material-icons">widgets</i>,
	//     to: "widget",
	//   },
	// //Forms
	// {
	//     title:'Forms',
	//     classsChange: 'mm-collapse',
	//     iconStyle: <i className="material-icons">insert_drive_file</i>,
	//     content : [
	//         {
	//             title:'Form Elements',
	//             to: 'form-element',
	//         },
	//         {
	//             title:'Wizard',
	//             to: 'form-wizard',
	//         },
	//         {
	//             title:'CkEditor',
	//             to: 'form-ckeditor',
	//         },
	//         {
	//             title:'Pickers',
	//             to: 'form-pickers',
	//         },
	//         {
	//             title:'Form Validate',
	//             to: 'form-validation',
	//         },

	//     ]
	// },
	// //Table
	// {
	//     title:'Table',
	//     classsChange: 'mm-collapse',
	//     iconStyle: <i className="material-icons">table_chart</i>,
	//     content : [
	//         {
	//             title:'Table Filtering',
	//             to: 'table-filtering',
	//         },
	//         {
	//             title:'Table Sorting',
	//             to: 'table-sorting',
	//         },
	//         {
	//             title:'Bootstrap',
	//             to: 'table-bootstrap-basic',
	//         },

	//     ]
	// },
	// //Pages
	// {
	//     title:'Pages',
	//     classsChange: 'mm-collapse',
	//     iconStyle: <i className="merial-icons">article</i>,
	//     content : [
	//         {
	//             title:'Error',
	//             hasMenu : true,
	//             content : [
	//                 {
	//                     title: 'Error 400',
	//                     to : 'page-error-400',
	//                 },
	//                 {
	//                     title: 'Error 403',
	//                     to : 'page-error-403',
	//                 },
	//                 {
	//                     title: 'Error 404',
	//                     to : 'page-error-404',
	//                 },
	//                 {
	//                     title: 'Error 500',
	//                     to : 'page-error-500',
	//                 },
	//                 {
	//                     title: 'Error 503',
	//                     to : 'page-error-503',
	//                 },
	//             ],
	//         },
	//         {
	//             title:'Lock Screen',
	//             to: 'page-lock-screen',
	//         },

	//     ]
	// },
];
