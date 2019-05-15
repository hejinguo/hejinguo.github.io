requirejs.config({
        urlArgs: "bust=" + (new Date()).getTime(),
        baseUrl: 'resources/js',
        paths: {
            // the left side is the module ID,
            // the right side is the path to
            // the jQuery file, relative to baseUrl.
            // Also, the path should NOT include
            // the '.js' file extension. This example
            // is using jQuery 1.9.0 located at
            // js/lib/jquery-1.9.0.js, relative to
            // the HTML page.
            'jquery': 'lib/jquery/jquery.min',
            'jquery.bootstrap': 'lib/bootstrap/bootstrap.min',
            'san': 'lib/san/san.min',
            'text': 'lib/require/text',
            'tool': 'agile/tool',
            'common.components': 'agile/common.components'
        },
        shim: {
            "jquery.bootstrap": {
                deps: ["jquery"]
            }
        }
    }
);

requirejs(['jquery', 'text', './agile/main', 'jquery.bootstrap'], function ($) {
    // console.log($) // OK
    // console.log(san);
    // alert(123);
});