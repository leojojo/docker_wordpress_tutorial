const rewire = require("rewire")
const index = rewire("./index")
const twentytwentyDomReady = index.__get__("twentytwentyDomReady")
const twentytwentyToggleAttribute = index.__get__("twentytwentyToggleAttribute")
const twentytwentyMenuToggle = index.__get__("twentytwentyMenuToggle")
const twentytwentyFindParents = index.__get__("twentytwentyFindParents")
// @ponicode
describe("twentytwentyDomReady", () => {
    test("0", () => {
        let callFunction = () => {
            twentytwentyDomReady(() => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            twentytwentyDomReady(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("twentytwentyToggleAttribute", () => {
    test("0", () => {
        let callFunction = () => {
            twentytwentyToggleAttribute({ getAttribute: () => "91659-4424", setAttribute: () => true }, "hsl(10%,20%,40%)", "Dillenberg", "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            twentytwentyToggleAttribute({ getAttribute: () => 62562, setAttribute: () => true }, "black", "Elio", "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            twentytwentyToggleAttribute({ getAttribute: () => 23306, setAttribute: () => true }, "rgb(20%,10%,30%)", "elio@example.com", "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            twentytwentyToggleAttribute({ getAttribute: () => "91659-4424", setAttribute: () => false }, "red", "Dillenberg", "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            twentytwentyToggleAttribute({ getAttribute: () => 23306, setAttribute: () => false }, "hsl(10%,20%,40%)", "Elio", "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            twentytwentyToggleAttribute(undefined, undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("twentytwentyMenuToggle", () => {
    test("0", () => {
        let callFunction = () => {
            twentytwentyMenuToggle({ parentElement: { transform: "George", offsetHeight: 1, x: "Foo bar", transitionDuration: "Mon Aug 03 12:45:00" }, classList: { add: () => false, toggle: () => false, remove: () => "Ronald Keeling" }, style: { transform: "Pierre Edouard", offsetHeight: "False Killer Whale", x: "Hello, world!", transitionDuration: "2017-09-29T19:01:00.000" }, closest: () => "Gail Hoppe", removeEventListener: () => true, addEventListener: () => true }, "bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            twentytwentyMenuToggle({ parentElement: { transform: "Anas", offsetHeight: "Long-finned Pilot Whale", x: "This is a Text", transitionDuration: "2017-09-29T19:01:00.000" }, classList: { add: () => true, toggle: () => true, remove: () => "Ronald Keeling" }, style: { transform: "Anas", offsetHeight: "Long-finned Pilot Whale", x: "This is a Text", transitionDuration: "Mon Aug 03 12:45:00" }, closest: () => "Gail Hoppe", removeEventListener: () => true, addEventListener: () => false }, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            twentytwentyMenuToggle({ parentElement: { transform: "Michael", offsetHeight: 1, x: "Hello, world!", transitionDuration: "Mon Aug 03 12:45:00" }, classList: { add: () => true, toggle: () => false, remove: () => "Gail Hoppe" }, style: { transform: "Jean-Philippe", offsetHeight: "False Killer Whale", x: "foo bar", transitionDuration: "2017-09-29T19:01:00.000" }, closest: () => "Becky Bednar", removeEventListener: () => false, addEventListener: () => true }, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            twentytwentyMenuToggle({ parentElement: { transform: "Michael", offsetHeight: -10, x: "foo bar", transitionDuration: "Mon Aug 03 12:45:00" }, classList: { add: () => false, toggle: () => true, remove: () => "Janet Homenick" }, style: { transform: "Jean-Philippe", offsetHeight: "Long-finned Pilot Whale", x: "This is a Text", transitionDuration: "2017-09-29T19:01:00.000" }, closest: () => "Ronald Keeling", removeEventListener: () => false, addEventListener: () => true }, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            twentytwentyMenuToggle({ parentElement: { transform: "Anas", offsetHeight: -1, x: "Hello, world!", transitionDuration: "01:04:03" }, classList: { add: () => false, toggle: () => false, remove: () => "Gail Hoppe" }, style: { transform: "Edmond", offsetHeight: "Long-finned Pilot Whale", x: "This is a Text", transitionDuration: "Mon Aug 03 12:45:00" }, closest: () => "Ronald Keeling", removeEventListener: () => false, addEventListener: () => true }, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            twentytwentyMenuToggle({}, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("twentytwentyFindParents", () => {
    test("0", () => {
        let callFunction = () => {
            twentytwentyFindParents({ matches: () => false }, "DELETE FROM Projects WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            twentytwentyFindParents({ matches: () => true }, "DELETE FROM Projects WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            twentytwentyFindParents({ matches: () => false }, "UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            twentytwentyFindParents({ matches: () => false }, "UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            twentytwentyFindParents({ matches: () => false }, "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            twentytwentyFindParents(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
