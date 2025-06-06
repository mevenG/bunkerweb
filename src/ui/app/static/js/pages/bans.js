$(document).ready(function () {
  var actionLock = false;
  let addBanNumber = 1;
  const banNumber = parseInt($("#bans_number").val());
  const dataCountries = ($("#countries").val() || "")
    .split(",")
    .filter((code) => code && code !== "local");
  const baseFlagsUrl = $("#base_flags_url").val().trim();
  const isReadOnly = $("#is-read-only").val().trim() === "True";
  const userReadOnly = $("#user-read-only").val().trim() === "True";

  const countriesDataNames = {
    AD: "Andorra",
    AE: "United Arab Emirates",
    AF: "Afghanistan",
    AG: "Antigua and Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antarctica",
    AR: "Argentina",
    AS: "American Samoa",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "Åland Islands",
    AZ: "Azerbaijan",
    BA: "Bosnia and Herzegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgium",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barthélemy",
    BM: "Bermuda",
    BN: "Brunei Darussalam",
    BO: "Bolivia, Plurinational State of",
    BQ: "Caribbean Netherlands",
    BR: "Brazil",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvet Island",
    BW: "Botswana",
    BY: "Belarus",
    BZ: "Belize",
    CA: "Canada",
    CC: "Cocos (Keeling) Islands",
    CD: "Congo, the Democratic Republic of the",
    CF: "Central African Republic",
    CG: "Republic of the Congo",
    CH: "Switzerland",
    CI: "Côte d'Ivoire",
    CK: "Cook Islands",
    CL: "Chile",
    CM: "Cameroon",
    CN: "China (People's Republic of China)",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Cape Verde",
    CW: "Curaçao",
    CX: "Christmas Island",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DE: "Germany",
    DJ: "Djibouti",
    DK: "Denmark",
    DM: "Dominica",
    DO: "Dominican Republic",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egypt",
    EH: "Western Sahara",
    ER: "Eritrea",
    ES: "Spain",
    ET: "Ethiopia",
    EU: "Europe",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falkland Islands (Malvinas)",
    FM: "Micronesia, Federated States of",
    FO: "Faroe Islands",
    FR: "France",
    GA: "Gabon",
    GB: "United Kingdom",
    GD: "Grenada",
    GE: "Georgia",
    GF: "French Guiana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Greenland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Equatorial Guinea",
    GR: "Greece",
    GS: "South Georgia and the South Sandwich Islands",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hong Kong",
    HM: "Heard Island and McDonald Islands",
    HN: "Honduras",
    HR: "Croatia",
    HT: "Haiti",
    HU: "Hungary",
    ID: "Indonesia",
    IE: "Ireland",
    IL: "Israel",
    IM: "Isle of Man",
    IN: "India",
    IO: "British Indian Ocean Territory",
    IQ: "Iraq",
    IR: "Iran, Islamic Republic of",
    IS: "Iceland",
    IT: "Italy",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenya",
    KG: "Kyrgyzstan",
    KH: "Cambodia",
    KI: "Kiribati",
    KM: "Comoros",
    KN: "Saint Kitts and Nevis",
    KP: "Korea, Democratic People's Republic of",
    KR: "Korea, Republic of",
    KW: "Kuwait",
    KY: "Cayman Islands",
    KZ: "Kazakhstan",
    LA: "Laos (Lao People's Democratic Republic)",
    LB: "Lebanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lithuania",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Morocco",
    MC: "Monaco",
    MD: "Moldova, Republic of",
    ME: "Montenegro",
    MF: "Saint Martin",
    MG: "Madagascar",
    MH: "Marshall Islands",
    MK: "North Macedonia",
    ML: "Mali",
    MM: "Myanmar",
    MN: "Mongolia",
    MO: "Macao",
    MP: "Northern Mariana Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldives",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mozambique",
    NA: "Namibia",
    NC: "New Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Netherlands",
    NO: "Norway",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "French Polynesia",
    PG: "Papua New Guinea",
    PH: "Philippines",
    PK: "Pakistan",
    PL: "Poland",
    PM: "Saint Pierre and Miquelon",
    PN: "Pitcairn",
    PR: "Puerto Rico",
    PS: "Palestine",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russian Federation",
    RW: "Rwanda",
    SA: "Saudi Arabia",
    SB: "Solomon Islands",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Sweden",
    SG: "Singapore",
    SH: "Saint Helena, Ascension and Tristan da Cunha",
    SI: "Slovenia",
    SJ: "Svalbard and Jan Mayen Islands",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    SS: "South Sudan",
    ST: "Sao Tome and Principe",
    SV: "El Salvador",
    SX: "Sint Maarten (Dutch part)",
    SY: "Syrian Arab Republic",
    SZ: "Swaziland",
    TC: "Turks and Caicos Islands",
    TD: "Chad",
    TF: "French Southern Territories",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tajikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turkey",
    TT: "Trinidad and Tobago",
    TV: "Tuvalu",
    TW: "Taiwan (Republic of China)",
    TZ: "Tanzania, United Republic of",
    UA: "Ukraine",
    UG: "Uganda",
    UM: "US Minor Outlying Islands",
    US: "United States",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Holy See (Vatican City State)",
    VC: "Saint Vincent and the Grenadines",
    VE: "Venezuela, Bolivarian Republic of",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis and Futuna Islands",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "South Africa",
    ZM: "Zambia",
    ZW: "Zimbabwe",
  };

  // Filter countriesDataNames to include only necessary countries
  const filteredCountriesDataNames = dataCountries.reduce((obj, code) => {
    if (countriesDataNames[code]) {
      obj[code] = countriesDataNames[code];
    }
    return obj;
  }, {});

  // Assuming baseFlagsUrl, dataCountries, and countriesDataNames are defined
  const countriesSearchPanesOptions = [
    {
      label: `<img src="${baseFlagsUrl}/zz.svg" class="border border-1 p-0 me-1" height="17" loading="lazy" />&nbsp;－&nbsp;N/A`,
      value: (rowData) => rowData[4].includes("N/A"),
    },
    ...Object.entries(filteredCountriesDataNames).map(([code, name]) => ({
      label: `<img src="${baseFlagsUrl}/${code.toLowerCase()}.svg" class="border border-1 p-0 me-1" height="17" loading="lazy" />&nbsp;－&nbsp;${name}`,
      value: (rowData) =>
        rowData[4].includes(`data-bs-original-title="${code}"`),
    })),
  ];

  // Batch update tooltips
  const updateCountryTooltips = () => {
    $("[data-bs-original-title]").each(function () {
      const $elem = $(this);
      const countryCode = $elem.attr("data-bs-original-title");
      const countryName = countriesDataNames[countryCode];
      if (countryName) {
        $elem.attr("data-bs-original-title", countryName);
      }
    });
    // Initialize tooltips once
    $('[data-bs-toggle="tooltip"]').tooltip();
  };

  // Utility functions
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function addHours(date, hours) {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Months are zero-based in JavaScript
    let day = date.getDate();

    // Pad month and day with leading zeros if needed
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Pad hours and minutes with leading zeros if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
  }

  // Select the Flatpickr input elements
  const flatpickrDatetime = $("[type='flatpickr-datetime']");

  // Get the current date and times
  const currentDatetime = new Date();
  const minDatetime = addHours(currentDatetime, 1);
  const defaultDatetime = addDays(currentDatetime, 1);

  // Format dates and times
  const minDateStr = formatDate(minDatetime);
  const minTimeStr = formatTime(minDatetime);

  // Create the minMaxTime table
  const minMaxTable = {
    [minDateStr]: {
      minTime: minTimeStr,
    },
  };

  const getTimeZoneOffset = () => {
    const offset = -currentDatetime.getTimezoneOffset(); // getTimezoneOffset returns minutes behind UTC
    const sign = offset >= 0 ? "+" : "-";
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutes = String(absOffset % 60).padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
  };

  // Initialize Flatpickr with altInput and altFormat
  const originalFlatpickr = flatpickrDatetime.flatpickr({
    enableTime: true,
    dateFormat: "Y-m-d\\TH:i:S", // ISO format
    altInput: true,
    altFormat: "F j, Y h:i K", // User-friendly display format
    time_24hr: true,
    defaultDate: defaultDatetime,
    minDate: minDatetime,
    plugins: [
      new minMaxTimePlugin({
        table: minMaxTable,
      }),
    ],
  });

  const setupUnbanModal = (bans) => {
    const list = $(
      `<ul class="list-group list-group-horizontal w-100">
      <li class="list-group-item bg-secondary text-white" style="flex: 1 0;">
        <div class="ms-2 me-auto">
          <div class="fw-bold">IP Address</div>
        </div>
      </li>
      <li class="list-group-item bg-secondary text-white" style="flex: 1 0;">
        <div class="fw-bold">Scope</div>
      </li>
      <li class="list-group-item bg-secondary text-white" style="flex: 1 0;">
        <div class="fw-bold">Time left</div>
      </li>
      </ul>`,
    );
    $("#selected-ips-unban").append(list);

    bans.forEach((ban) => {
      // Create the list item using template literals
      const list = $(
        `<ul class="list-group list-group-horizontal w-100"></ul>`,
      );

      const listItem = $(`<li class="list-group-item" style="flex: 1 0;">
        <div class="ms-2 me-auto">
          <div class="fw-bold">${ban.ip}</div>
        </div>
      </li>`);
      list.append(listItem);

      const scopeItem = $(`<li class="list-group-item" style="flex: 1 0;">
        <div class="ms-2 me-auto">
          ${ban.ban_scope || "global"}${
            ban.service && ban.ban_scope === "service"
              ? ` (${ban.service})`
              : ""
          }
        </div>
      </li>`);
      list.append(scopeItem);

      const timeLeft = $(`<li class="list-group-item" style="flex: 1 0;">
        <div class="ms-2 me-auto">
          ${ban.time_remaining}
        </div>
      </li>`);
      list.append(timeLeft);

      $("#selected-ips-unban").append(list);
    });

    const unban_modal = $("#modal-unban-ips");
    const modal = new bootstrap.Modal(unban_modal);
    unban_modal
      .find(".alert")
      .text(
        `Are you sure you want to unban the selected IP address${"es".repeat(
          bans.length > 1,
        )}?`,
      );
    modal.show();

    $("#selected-ips-input-unban").val(JSON.stringify(bans));
  };

  const layout = {
    top1: {
      searchPanes: {
        viewTotal: true,
        cascadePanes: true,
        collapse: false,
        columns: [2, 4, 7, 8],
      },
    },
    topStart: {},
    topEnd: {
      search: true,
      buttons: [
        {
          extend: "toggle_filters",
          className: "btn btn-sm btn-outline-primary toggle-filters",
        },
      ],
    },
    bottomStart: {
      info: true,
    },
    bottomEnd: {},
  };

  if (banNumber > 10) {
    const menu = [10];
    if (banNumber > 25) {
      menu.push(25);
    }
    if (banNumber > 50) {
      menu.push(50);
    }
    if (banNumber > 100) {
      menu.push(100);
    }
    menu.push({ label: "All", value: -1 });
    layout.bottomStart = {
      pageLength: {
        menu: menu,
      },
      info: true,
    };
    layout.bottomEnd.paging = true;
  }

  layout.topStart.buttons = [
    {
      extend: "add_ban",
    },
    {
      extend: "colvis",
      columns: "th:not(:nth-child(-n+3)):not(:last-child)",
      text: '<span class="tf-icons bx bx-columns bx-18px me-md-2"></span><span class="d-none d-md-inline">Columns</span>',
      className: "btn btn-sm btn-outline-primary rounded-start",
      columnText: function (dt, idx, title) {
        return idx + 1 + ". " + title;
      },
    },
    {
      extend: "colvisRestore",
      text: '<span class="tf-icons bx bx-reset bx-18px me-2"></span>Reset columns',
      className: "btn btn-sm btn-outline-primary d-none d-md-inline",
    },
    {
      extend: "collection",
      text: '<span class="tf-icons bx bx-export bx-18px me-md-2"></span><span class="d-none d-md-inline">Export</span>',
      className: "btn btn-sm btn-outline-primary",
      buttons: [
        {
          extend: "copy",
          text: '<span class="tf-icons bx bx-copy bx-18px me-2"></span>Copy visible',
          exportOptions: {
            columns: ":visible:not(:nth-child(-n+2)):not(:last-child)",
          },
        },
        {
          extend: "csv",
          text: '<span class="tf-icons bx bx-table bx-18px me-2"></span>CSV',
          bom: true,
          filename: "bw_bans",
          exportOptions: {
            modifier: {
              search: "none",
            },
            columns: ":not(:nth-child(-n+2)):not(:last-child)",
          },
        },
        {
          extend: "excel",
          text: '<span class="tf-icons bx bx-table bx-18px me-2"></span>Excel',
          filename: "bw_bans",
          exportOptions: {
            modifier: {
              search: "none",
            },
            columns: ":not(:nth-child(-n+2)):not(:last-child)",
          },
        },
      ],
    },
    {
      extend: "collection",
      text: '<span class="tf-icons bx bx-play bx-18px me-md-2"></span><span class="d-none d-md-inline">Actions</span>',
      className: "btn btn-sm btn-outline-primary action-button disabled",
      buttons: [
        {
          extend: "unban_ips",
          className: "text-danger",
        },
      ],
    },
  ];

  $("#modal-unban-ips").on("hidden.bs.modal", function () {
    $("#selected-ips-unban").empty();
    $("#selected-ips-input-unban").val("");
  });

  const getSelectedBans = () => {
    const bans = [];
    $("tr.selected").each(function () {
      const ip = $(this).find("td:eq(3)").text().trim();
      const time_remaining = $(this).find("td:eq(9)").text().trim();
      const ban_scope = $(this).find("td:eq(6)").text().trim().toLowerCase();
      const service = $(this).find("td:eq(7)").text().trim();

      bans.push({
        ip: ip,
        time_remaining: time_remaining,
        ban_scope: ban_scope,
        service: service !== "All services" ? service : null,
      });
    });
    return bans;
  };

  $.fn.dataTable.ext.buttons.add_ban = {
    text: '<span class="tf-icons bx bx-plus"></span><span class="d-none d-md-inline">&nbsp;Add ban(s)</span>',
    className: `btn btn-sm rounded me-4 btn-bw-green${
      isReadOnly ? " disabled" : ""
    }`,
    action: function (e, dt, node, config) {
      if (isReadOnly) {
        alert("This action is not allowed in read-only mode.");
        return;
      }
      const ban_modal = $("#modal-ban-ips");
      const modal = new bootstrap.Modal(ban_modal);
      modal.show();
    },
  };

  $.fn.dataTable.ext.buttons.unban_ips = {
    text: '<span class="tf-icons bx bxs-buoy bx-18px me-2"></span>Unban',
    action: function (e, dt, node, config) {
      if (isReadOnly) {
        alert("This action is not allowed in read-only mode.");
        return;
      }
      if (actionLock) {
        return;
      }
      actionLock = true;
      $(".dt-button-background").click();

      const bans = getSelectedBans();
      if (bans.length === 0) {
        actionLock = false;
        return;
      }

      setupUnbanModal(bans);

      actionLock = false;
    },
  };

  const bans_table = initializeDataTable({
    tableSelector: "#bans",
    tableName: "bans",
    columnVisibilityCondition: (column) => column > 2 && column < 8,
    dataTableOptions: {
      columnDefs: [
        {
          orderable: false,
          className: "dtr-control",
          targets: 0,
        },
        {
          orderable: false,
          render: DataTable.render.select(),
          targets: 1,
        },
        { type: "ip-address", targets: 2 },
        {
          orderable: false,
          targets: -1,
        },
        {
          targets: [2, 8],
          render: function (data, type, row) {
            if (type === "display" || type === "filter") {
              const date = new Date(data);
              if (!isNaN(date.getTime())) {
                return date.toLocaleString();
              }
            }
            return data;
          },
        },
        {
          searchPanes: {
            show: true,
            options: [
              {
                label: "Last 24 hours",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[2]);
                  const now = new Date();
                  return now - date < 24 * 60 * 60 * 1000;
                },
              },
              {
                label: "Last 7 days",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[2]);
                  const now = new Date();
                  return now - date < 7 * 24 * 60 * 60 * 1000;
                },
              },
              {
                label: "Last 30 days",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[2]);
                  const now = new Date();
                  return now - date < 30 * 24 * 60 * 60 * 1000;
                },
              },
              {
                label: "More than 30 days",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[2]);
                  const now = new Date();
                  return now - date >= 30 * 24 * 60 * 60 * 1000;
                },
              },
            ],
            combiner: "or",
            orderable: false,
          },
          targets: 2,
        },
        {
          searchPanes: {
            show: true,
            combiner: "or",
            options: countriesSearchPanesOptions,
          },
          targets: 4,
        },
        {
          searchPanes: {
            show: true,
            options: [
              {
                label: "Next 24 hours",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[8]);
                  const now = new Date();
                  return date - now < 24 * 60 * 60 * 1000;
                },
              },
              {
                label: "Next 7 days",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[8]);
                  const now = new Date();
                  return date - now < 7 * 24 * 60 * 60 * 1000;
                },
              },
              {
                label: "Next 30 days",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[8]);
                  const now = new Date();
                  return date - now < 30 * 24 * 60 * 60 * 1000;
                },
              },
              {
                label: "More than 30 days",
                value: function (rowData, rowIdx) {
                  const date = new Date(rowData[8]);
                  const now = new Date();
                  return date - now >= 30 * 24 * 60 * 60 * 1000;
                },
              },
            ],
            combiner: "or",
            orderable: false,
          },
          targets: 8,
        },
        {
          searchPanes: { show: true },
          targets: 7,
        },
      ],
      order: [[7, "asc"]],
      autoFill: false,
      responsive: true,
      select: {
        style: "multi+shift",
        selector: "td:nth-child(2)",
        headerCheckbox: true,
      },
      layout: layout,
      language: {
        info: "Showing _START_ to _END_ of _TOTAL_ bans",
        infoEmpty: "No bans available",
        infoFiltered: "(filtered from _MAX_ total bans)",
        lengthMenu: "Display _MENU_ bans",
        zeroRecords: "No matching bans found",
        select: {
          rows: {
            _: "Selected %d bans",
            0: "No bans selected",
            1: "Selected 1 ban",
          },
        },
      },
      initComplete: function (settings, json) {
        $("#bans_wrapper .btn-secondary").removeClass("btn-secondary");
        if (isReadOnly)
          $("#bans_wrapper .dt-buttons")
            .attr(
              "data-bs-original-title",
              `${
                userReadOnly
                  ? "Your account is readonly"
                  : "The database is in readonly"
              }, therefore you cannot add bans.`,
            )
            .attr("data-bs-placement", "right")
            .tooltip();
        updateCountryTooltips();
      },
    },
  });

  // Update tooltips after table draw
  bans_table.on("draw.dt", updateCountryTooltips);

  $(document).on("click", ".unban-ip", function () {
    if (isReadOnly) {
      alert("This action is not allowed in read-only mode.");
      return;
    }
    $this = $(this);
    const row = $this.closest("tr");
    const ban_scope = row.find("td:eq(6)").text().trim().toLowerCase();
    const service = row.find("td:eq(7)").text().trim();

    setupUnbanModal([
      {
        ip: $this.data("ip"),
        time_remaining: $this.data("time-left"),
        ban_scope: ban_scope,
        service: service !== "All services" ? service : null,
      },
    ]);
  });

  $("#add-ban").on("click", function () {
    const originalBan = $("#ban-1");
    const banClone = originalBan.clone();
    banClone.attr("id", `ban-${++addBanNumber}`);

    banClone
      .find("input[name='ip']")
      .removeClass("is-valid is-invalid")
      .val("");
    banClone.find("[readonly='readonly']").remove();
    banClone.find(".flatpickr-input").flatpickr({
      enableTime: true,
      dateFormat: "Y-m-d\\TH:i:S", // ISO format
      altInput: true,
      altFormat: "F j, Y h:i", // User-friendly display format
      time_24hr: true,
      defaultDate: defaultDatetime,
      minDate: minDatetime,
      plugins: [
        new minMaxTimePlugin({
          table: minMaxTable,
        }),
      ],
    });
    banClone.find("input[name='reason']").val("ui");

    // Replace delete button with a functional one
    const deleteButtonContainer = banClone.find(".col-12.col-md-1");
    deleteButtonContainer.html(`
      <button type="button"
              class="btn btn-outline-danger btn-sm delete-ban"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Remove this ban entry">
        <i class="bx bx-trash bx-xs"></i>
      </button>
    `);

    // Initialize ban scope handlers for the cloned item
    initializeBanScopeHandlers(banClone);

    $("#bans-container").append(banClone);

    // Initialize tooltip for the new delete button
    banClone.find('[data-bs-toggle="tooltip"]').tooltip();
  });

  $("#clear-bans").on("click", function () {
    $("#bans-container")
      .find("li")
      .each(function () {
        if (
          $(this).attr("id") === "ban-1" ||
          $(this).attr("id") === "bans-header"
        )
          return;
        $(this).remove();
      });
  });

  $(document).on("click", ".delete-ban", function () {
    if (isReadOnly) {
      alert("This action is not allowed in read-only mode.");
      return;
    }

    // Get the ban item container and remove it
    const banContainer = $(this).closest("li.ban-item");

    // Double check that we're not deleting the first ban entry
    if (banContainer.attr("id") === "ban-1") {
      return;
    }

    // Fade out and remove
    banContainer.fadeOut(300, function () {
      $(this).remove();
    });
  });

  $("#modal-ban-ips").on("hidden.bs.modal", function () {
    $("#clear-bans").trigger("click");
    const firstBan = $("#ban-1");
    firstBan.find("input[name='ip']").val("");
    firstBan.find("input[name='reason']").val("ui");
    originalFlatpickr.setDate(defaultDatetime);
  });

  const ipRegex = new RegExp(
    /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?!$)|$)){4}$|^((?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,7}:|:(?::[A-Fa-f0-9]{1,4}){1,7}|::)$/i,
  );

  // Modified validateBan function to cleanly separate global and service bans
  const validateBan = (banIpInput, ipServiceMap) => {
    const value = banIpInput.val().trim();
    let errorMessage = "";
    let isValid = true;

    if (value === "") {
      errorMessage = "Please enter an IP address.";
      isValid = false;
    } else if (!ipRegex.test(value)) {
      errorMessage = "Please enter a valid IP address.";
      isValid = false;
    } else {
      // Get the ban container
      const banContainer = banIpInput.closest("li.ban-item");
      const banScope = banContainer.find('select[name="ban_scope"]').val();

      if (banScope === "global") {
        // For global scope bans, check if this IP already has a global ban
        if (ipServiceMap.has(`${value}:global`)) {
          errorMessage = "This IP address already has a global ban entry.";
          isValid = false;
        }
        // Note: We allow an IP to have both global and service-specific bans
      } else if (banScope === "service") {
        const service = banContainer.find('select[name="service"]').val();

        // Check service is selected
        if (!service) {
          errorMessage = "Please select a service for this ban.";
          isValid = false;
        }
        // Check for duplicate service ban
        else if (ipServiceMap.has(`${value}:service:${service}`)) {
          errorMessage = `This IP is already banned for the service "${service}".`;
          isValid = false;
        }
      }
    }

    // Toggle valid/invalid classes
    banIpInput
      .toggleClass("is-valid", isValid)
      .toggleClass("is-invalid", !isValid);

    // Manage the invalid-feedback element
    let $feedback = banIpInput.next(".invalid-feedback");
    if (!$feedback.length) {
      $feedback = $('<div class="invalid-feedback"></div>').insertAfter(
        banIpInput,
      );
    }

    $feedback.text(errorMessage);

    return isValid;
  };

  // Update input validation to use the new service-aware validation
  $("#bans-container").on("input", "input[name='ip']", function () {
    debounce(() => {
      const $input = $(this);
      // Map to store IP:scope or IP:service combinations
      const ipServiceMap = new Map();

      // Gather all other ban entries except the current one
      $("#bans-container")
        .find("li.ban-item")
        .not($input.closest("li.ban-item"))
        .each(function () {
          const $li = $(this);
          const ip = $li.find("input[name='ip']").val().trim();
          if (!ip) return; // Skip empty IPs

          const banScope = $li.find("select[name='ban_scope']").val();
          if (banScope === "global") {
            ipServiceMap.set(`${ip}:global`, true);
          } else if (banScope === "service") {
            const service = $li.find("select[name='service']").val();
            if (service) {
              ipServiceMap.set(`${ip}:service:${service}`, true);
            }
          }
        });

      validateBan($input, ipServiceMap);
    }, 100)();
  });

  // Also update form submission validation
  $("#bans-form").on("submit", function (e) {
    e.preventDefault();

    let allValid = true;
    const ipServiceMap = new Map();

    // First pass - collect all existing IP + scope/service combinations
    $("#bans-container")
      .find("li.ban-item")
      .each(function () {
        const $li = $(this);
        const $input = $li.find("input[name='ip']");
        const ip = $input.val().trim();

        if (!ip) return; // Skip empty IPs

        const banScope = $li.find("select[name='ban_scope']").val();

        // Validate global ban
        if (banScope === "global") {
          const key = `${ip}:global`;

          if (ipServiceMap.has(key)) {
            allValid = false;
            $input.addClass("is-invalid");

            let $feedback = $input.next(".invalid-feedback");
            if (!$feedback.length) {
              $feedback = $('<div class="invalid-feedback"></div>').insertAfter(
                $input,
              );
            }
            $feedback.text("Duplicate global ban for this IP");
          } else {
            ipServiceMap.set(key, true);
          }
        }
        // Validate service ban
        else if (banScope === "service") {
          const service = $li.find("select[name='service']").val();

          if (!service) {
            allValid = false;
            $input.addClass("is-invalid");

            let $feedback = $input.next(".invalid-feedback");
            if (!$feedback.length) {
              $feedback = $('<div class="invalid-feedback"></div>').insertAfter(
                $input,
              );
            }
            $feedback.text("Please select a service for this ban");
          } else {
            const key = `${ip}:service:${service}`;

            if (ipServiceMap.has(key)) {
              allValid = false;
              $input.addClass("is-invalid");

              let $feedback = $input.next(".invalid-feedback");
              if (!$feedback.length) {
                $feedback = $(
                  '<div class="invalid-feedback"></div>',
                ).insertAfter($input);
              }
              $feedback.text(
                `This IP is already banned for the service "${service}"`,
              );
            } else {
              ipServiceMap.set(key, true);
            }
          }
        }

        // Always validate IP format
        if (!ipRegex.test(ip)) {
          allValid = false;
          $input.addClass("is-invalid");

          let $feedback = $input.next(".invalid-feedback");
          if (!$feedback.length) {
            $feedback = $('<div class="invalid-feedback"></div>').insertAfter(
              $input,
            );
          }
          $feedback.text("Please enter a valid IP address");
        }
      });

    if (!allValid) return;

    // Rest of the form submission code
    const bans = [];
    $("#bans-container")
      .find("li.rounded-0")
      .each(function () {
        $this = $(this);
        const ip = $this.find("input[name='ip']").val().trim();
        const end_date = $this.find(".flatpickr-input").val();
        const reason = $this.find("input[name='reason']").val().trim();
        const ban_scope = $this.find("select[name='ban_scope']").val();
        const service =
          ban_scope === "service"
            ? $this.find("select[name='service']").val()
            : "Web UI";

        bans.push({
          ip: ip,
          end_date: `${end_date}${getTimeZoneOffset()}`,
          reason: reason,
          ban_scope: ban_scope,
          service: service,
        });
      });

    const form = $("<form>", {
      method: "POST",
      action: `${window.location.pathname}/ban`,
      class: "visually-hidden",
    });

    // Add CSRF token and bans as hidden inputs
    form.append(
      $("<input>", {
        type: "hidden",
        name: "csrf_token",
        value: $("#csrf_token").val(),
      }),
    );
    form.append(
      $("<input>", {
        type: "hidden",
        name: "bans",
        value: JSON.stringify(bans),
      }),
    );

    // Append the form to the body and submit it
    form.appendTo("body").submit();
  });

  // Add validation on service selection change
  $("#bans-container").on("change", "select[name='service']", function () {
    const $banItem = $(this).closest("li.ban-item");
    const $ipInput = $banItem.find("input[name='ip']");

    if ($ipInput.val().trim()) {
      // Re-validate this IP if it already has a value
      $ipInput.trigger("input");
    }
  });

  // Initialize ban scope selection for the first ban item
  initializeBanScopeHandlers($("#ban-1"));

  function initializeBanScopeHandlers($banItem) {
    const $banScopeSelect = $banItem.find(".ban-scope-select");
    const $serviceField = $banItem.find(".service-field");
    const $serviceSelect = $serviceField.find('select[name="service"]');

    // Initial setup
    toggleServiceField($banScopeSelect.val(), $serviceField, $serviceSelect);

    // Handle change events
    $banScopeSelect.on("change", function () {
      const newScope = $(this).val();
      toggleServiceField(newScope, $serviceField, $serviceSelect);

      // Clear any validation errors when switching scope
      const $ipInput = $banItem.find("input[name='ip']");
      $ipInput.removeClass("is-invalid");
      const $feedback = $ipInput.next(".invalid-feedback");
      if ($feedback.length) {
        $feedback.text("");
      }

      // Re-validate after switching scope if we have an IP address
      if ($ipInput.val().trim()) {
        // Short delay to let the DOM update
        setTimeout(() => $ipInput.trigger("input"), 50);
      }
    });
  }

  function toggleServiceField(scopeValue, $serviceField, $serviceSelect) {
    if (scopeValue === "service") {
      $serviceField.addClass("show");
      $serviceSelect.attr("required", true);
    } else {
      $serviceField.removeClass("show");
      $serviceSelect.removeAttr("required");
    }
  }
});
