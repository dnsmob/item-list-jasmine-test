describe ('Test TDD', function () {

    var js;
    var field, button, list;

    beforeEach (function () {
        loadFixtures ('fixture.html');
    });

    // check if all required html objects are present
    describe ('Check html elements presence', function () {
        it ('fixture should have #myInput', function () {
            expect ($ ('input#myInput')).toExist ();
        });

        it ('fixture should have #myButton', function () {
            expect ($ ('button#myButton')).toExist ();
        });

        it ('fixture should have #myList', function () {
            expect ($ ('ul#myList')).toExist ();
        });

        it ('fixture should have #myTotal', function () {
            expect ($ ('div#myTotal')).toExist ();
        });
    });

    describe ('Wipe localStorage', function () {
        it ('should not exist yet', function () {
            delete localStorage[ 'list' ];
            expect (localStorage[ 'list' ]).not.toExist ();
        });
    });

    // preset jquery objects to use with jasmine
    beforeEach (function () {
        field = $ ('#myInput');
        button = $ ('myButton');
        list = $ ('#myList');
        total = $ ('#myTotal');

        js = new Test (button, field, list, total);
    });

    describe ("Adding a few values", function () {
        beforeEach (function () {
            $ ('#myButton').click (js.onAddItemClicked.bind (js));
        });

        it ("should not add an item as field is empty", function () {
            field.val ('');

            var spyEvent = spyOnEvent ('#myButton', 'click');
            $ ('#myButton').click ();

            expect (spyEvent).toHaveBeenTriggered ();
            expect (list).toBeEmpty ();
        });

        it ("should add fish item", function () {
            field.val ('fish');

            var spyEvent = spyOnEvent ('#myButton', 'click');
            $ ('#myButton').click ();

            expect (spyEvent).toHaveBeenTriggered ();
            expect (list.children ().length).toBe (1);
        });

        it ("should add cheese item", function () {
            field.val ('cheese');

            var spyEvent = spyOnEvent ('#myButton', 'click');
            $ ('#myButton').click ();

            expect (spyEvent).toHaveBeenTriggered ();
            expect (list.children ().length).toBe (2);
        });

        it ("should add bread item", function () {
            field.val ('bread');

            var spyEvent = spyOnEvent ('#myButton', 'click');
            $ ('#myButton').click ();

            expect (spyEvent).toHaveBeenTriggered ();
            expect (list.children ().length).toBe (3);
        });
    });

    describe ("Remove a value (at random)", function () {
        var listLen, delButton;

        beforeEach (function () {
            listLen = list.children ().length - 1;
            delButton = '#myList li[itemid=' + (Math.round (Math.random () * listLen)) + '] button';
        });

        it ("should remove an item from the list", function () {
            var spyEvent = spyOnEvent (delButton, 'click');
            $ (delButton).click ();

            expect (spyEvent).toHaveBeenTriggered ();
            expect (list.children ().length).toBe (listLen);

            // just logging final objects..
            console.log (list.children ());
        });
    });
});