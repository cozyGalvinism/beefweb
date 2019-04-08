#include "queue_controller.hpp"
#include "file_system.hpp"
#include "settings.hpp"
#include "log.hpp"
#include "router.hpp"
#include "core_types_parsers.hpp"
#include "core_types_json.hpp"
#include "player_api.hpp"
#include "player_api_json.hpp"
#include "player_api_parsers.hpp"

#include <boost/algorithm/string.hpp>

namespace msrv {
    namespace {

        const char FILE_SCHEME[] = "file://";

        std::string stripFileScheme(const std::string& url)
        {
            if (boost::starts_with(url, FILE_SCHEME))
                return url.substr(sizeof(FILE_SCHEME) - 1);

            return url;
        }

    }

    QueueController::QueueController(Request* request, Player* player, SettingsStore* store)
    : ControllerBase(request), player_(player), store_(store)
    {
    }

    QueueController::~QueueController()
    {
    }

    void QueueController::addToQueue() {
        logInfo("Add to queue...");
        auto plref = param<PlaylistRef>("plref");
        auto item = param<int32_t>("plitem");

        player_->addToQueue(plref, item);
    }

    void QueueController::defineRoutes(Router* router, WorkQueue* workQueue, Player* player, SettingsStore* store)
    {
        auto routes = router->defineRoutes<QueueController>();

        routes.createWith([=](Request* request)
        {
            return new QueueController(request, player, store);
        });

        routes.useWorkQueue(workQueue);

        routes.setPrefix("api/queue");

        logInfo("Loading custom addToQueue controller...");
        routes.post(":plref/:plitem/queue/add", &QueueController::addToQueue);
    }
}