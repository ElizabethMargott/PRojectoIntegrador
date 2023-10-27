import {
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarTodayIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  Note as NoteIcon,
} from "@mui/icons-material";
export function FooterComponent() {
  return (
    <footer style={{ backgroundColor: "#1976D2" }} className="text-center p-3">
      <div className="d-flex justify-content-center">
        <div className="icon-container mb-2 mb-md-0 mx-2 mx-sm-3 mx-md-3 mx-lg-4">
          <NoteIcon />
          <div className="icon-label">Notas</div>
        </div>
        <div className="icon-container mb-2 mb-md-0 mx-2 mx-sm-3 mx-md-3 mx-lg-4">
          <ListIcon />
          <div className="icon-label">Listas</div>
        </div>
        <div className="icon-container mb-2 mb-md-0 mx-2 mx-sm-3 mx-md-3 mx-lg-4">
          <DashboardIcon />
          <div className="icon-label">Kanban</div>
        </div>
        <div className="icon-container mb-2 mb-md-0 mx-2 mx-sm-3 mx-md-3 mx-lg-4">
          <CalendarTodayIcon />
          <div className="icon-label">Calendario</div>
        </div>
        <div className="icon-container mb-2 mb-md-0 mx-2 mx-sm-3 mx-md-3 mx-lg-4">
          <CheckCircleIcon />
          <div className="icon-label">Hábitos</div>
        </div>
      </div>
    </footer>
  );
}
