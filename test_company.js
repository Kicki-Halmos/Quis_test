class Economy {
    constructor(companies, employees) {
        this.companies = [];
        this.company_id_counter = 1;

        this.employees = [];

        // this.btn;

        this.set_companies(companies);
        //this.setup_event_listeners();

        this.start();
    }

    start() {
        this.add_company({companyName: "Nissan", address: "Gatan 4", invoiceEmail: "hello@nissan.se"});

        //this.print_companies();
        let company = this.get_company_by_name("Volvo");
        company.add_invoice("Bildörr", 1000);
        company.add_invoice("Ratt", 500);
        company.add_invoice("Matta", 750);
        
        this.print_companies();
    }

    /*
    setup_event_listeners() {
        let self = this;
        this.btn = document.getElementById("button");

        document.getElementById("button").addEventListener("click", function() {
            self.print_companies();
        });
    }
    */

    print_companies() {
        for ( let company of this.companies) {
            company.print();
        }
    }

    get_company_by_id(id) {
        for ( let company of this.companies) {
            if (company.id == id) {
                return company;
            }
        }
    }

    get_company_by_name(name) {
        for ( let company of this.companies) {
            if (company.companyName == name) {
                return company;
            }
        }
    }


    set_companies(companies_json) {   
        let companies = JSON.parse(companies_json);
        for (let company of companies) {
            this.companies.push(new Company(company, this.company_id_counter++));
        }
    }

    add_company(company) {
        this.companies.push(new Company(company, this.company_id_counter++)) 
    }
}

//här slutar class economy

class Company { // motsvarar min quiz
    constructor(company, id) {
        this.id           = id;
        this.companyName  = company.companyName;
        this.address      = company.address;
        this.invoiceEmail = company.invoiceEmail;
        this.employess    = [];

        this.invoices     = [];
    }

    add_invoice(product, amount) {
        this.invoices.push(new Invoice(product, amount));
    }

    print() {
        console.log(this);
        /*
        console.log(this.companyName);
        console.log(this.address);
        */
        console.log('-------');
    }
}

class Employee {

}

class Invoice {
    constructor(product, amount) {
        this.product = product;
        this.amount  = amount;
    }

    print() {
        console.log(this.product);
        console.log(this.amount);
        console.log('*********')
    }
}

class Payout {

}

let companies = JSON.stringify([
    {
        companyName: "Ikea",
        address: "Road 123",
        invoiceEmail: "invoice@ikea.com"
    },
    {
        companyName: "Volvo",
        address: "Göteborg",
        invoiceEmail: "invoice@volvo.se"
    }
]);

let employees = JSON.stringify([
    {
        name: "Kalle",
        salary: 25000
    },
    {
        name: "Jessica",
        salary: 27000
    },
]);

let economy = new Economy(companies, employees);

/*
document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById("button");
    button.addEventListener("click", function() {
        // Do something
    })
})
*/