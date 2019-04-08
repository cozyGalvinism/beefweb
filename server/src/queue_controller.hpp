#pragma once

#include "defines.hpp"
#include "controller.hpp"

namespace msrv {

class Player;
class Router;
class SettingsStore;

class QueueController : public ControllerBase
{
public:
    QueueController(Request* request, Player* player, SettingsStore* store);
    ~QueueController();

    void addToQueue();

    static void defineRoutes(Router* router, WorkQueue* workQueue, Player* player, SettingsStore* store);

private:
    Player* player_;
    SettingsStore* store_;

    MSRV_NO_COPY_AND_ASSIGN(QueueController);
};

}
