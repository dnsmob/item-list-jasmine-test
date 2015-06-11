var Test = function (button, field, list, total) {

    // map all required html nodes
    this.button = button;
    this.field = field;
    this.list = list;
    this.total = total;

    // try to restore from localStorage
    this.restoreItems ();
};


Test.prototype = {

    constructor : Test,

    restoreItems : function () {
        // check if there is a list in localStorage and recreate the it
        if (localStorage [ 'list' ]) {
            var array = localStorage [ 'list' ].split ('§');
            if (array.length > 0) {
                // list has items, rebuild it
                $.each (array, function (index, value) {
                    this.list.append (this.createListItem (value));
                }.bind (this));

                this.updateCount ();
            }
        }
    },

    onAddItemClicked : function () {
        // only process if there's a valid value in the field
        var copy = this.field.val ().trim ();
        if (copy && copy.length > 0) {
            this.list.append (this.createListItem (copy)); // appends <li>text <del button></li>
            this.field.val ('');

            this.addStorage (copy);
            this.updateCount (); // adds itemId to li
        }
    },

    createListItem : function (copy) {
        // create li with text and del button
        var li = $ ('<li></li>');
        li.append (copy);
        li.append (this.createDeleteButton ());

        return li;
    },

    createDeleteButton : function () {
        // create delete button and remove hook
        var del = $ ('<button type="button">Delete</button>');
        del.click (function () {
            var parent = del.parent ();
            this.removeStorage (parent.attr ('itemId'));
            parent.remove ();

            this.updateCount ();
        }.bind (this));

        return del;
    },

    addStorage : function (copy) {
        var stored = localStorage [ 'list' ] || '';
        // localStorage is a string, so using a single string character as separator could lead to problems in the future.
        // it would be better to use some library or a unique symbol sequence. as exercise, simply using § as separator.
        stored += (stored.length <= 0) ? copy : '§' + copy;
        localStorage.setItem ('list', stored);
    },

    removeStorage : function (index) {
        // convert storage string to array and remove single item
        var array = localStorage [ 'list' ].split ('§');
        array.splice (index, 1);
        localStorage.setItem ('list', array.join ('§'));
    },

    updateCount : function () {
        var count = 0;
        $.each (this.list.children (), function (index, value) { // loop thru al children and assign an itemId to them individually
            $ (value).attr ('itemid', index);
            count = index + 1;
        });

        if (count < 1) {
            this.total.text ('');
        } else if (count >= 1) {
            this.total.text (count + (count === 1 ? ' item' : ' items') + ' in list');
        }
    }
};


jQuery (document).ready (function ($) {

    var test = new Test ($ ('#myButton'), $ ('#myInput'), $ ('#myList'), $ ('#myTotal'));

    // listen for clicks on add button
    test.button.click (test.onAddItemClicked.bind (test));
});












