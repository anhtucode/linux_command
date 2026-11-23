(() => {
  "use strict";

  const command = (name, category, level, summary, syntax, example, output, options = [], safety = "", aliases = []) => ({
    id: name.replace(/[^a-z0-9]+/g, "-"), name, aliases, category, level, summary, syntax, example, output, options, safety
  });

  const categories = [
    { id: "files", label: "Điều hướng & tệp", icon: "./", color: "#52e89b", description: "Di chuyển, tạo và quản lý tệp" },
    { id: "text", label: "Văn bản & tìm kiếm", icon: "//", color: "#67d9ed", description: "Đọc, lọc và so sánh nội dung" },
    { id: "archive", label: "Nén & truyền dữ liệu", icon: "⇅", color: "#a99cf5", description: "Đóng gói và tải dữ liệu" },
    { id: "system", label: "Tiến trình & hệ thống", icon: "⌁", color: "#f2bb61", description: "Theo dõi tài nguyên và dịch vụ" },
    { id: "network", label: "Mạng & bảo mật", icon: "◎", color: "#ef8f7f", description: "Kết nối, tải xuống và tường lửa" },
    { id: "users", label: "Người dùng & quyền", icon: "#", color: "#e394d5", description: "Quản lý tài khoản và đặc quyền" },
    { id: "shell", label: "Shell & gói phần mềm", icon: "$_", color: "#8ab6ff", description: "Tùy biến shell và cài phần mềm" }
  ];

  const commands = [
    command("ls", "files", "Cơ bản", "Liệt kê tệp và thư mục trong một vị trí.", "ls [tùy_chọn] [đường_dẫn]", "ls -la", "drwxr-xr-x  projects/\n-rw-r--r--  notes.txt", ["-l — hiển thị dạng chi tiết", "-a — gồm cả tệp ẩn", "-h — kích thước dễ đọc"]),
    command("pwd", "files", "Cơ bản", "In đường dẫn tuyệt đối của thư mục đang làm việc.", "pwd", "pwd", "/home/learner"),
    command("cd", "files", "Cơ bản", "Chuyển thư mục làm việc hiện tại.", "cd [đường_dẫn]", "cd /var/log", "", ["cd .. — lên thư mục cha", "cd ~ — về thư mục nhà", "cd - — quay lại thư mục trước"]),
    command("mkdir", "files", "Cơ bản", "Tạo một hoặc nhiều thư mục mới.", "mkdir [tùy_chọn] tên_thư_mục", "mkdir -p projects/demo", "", ["-p — tạo cả thư mục cha nếu cần"]),
    command("mv", "files", "Cơ bản", "Di chuyển hoặc đổi tên tệp và thư mục.", "mv [tùy_chọn] nguồn đích", "mv draft.txt notes.txt", "", ["-i — hỏi trước khi ghi đè", "-v — hiển thị thao tác"], "Đích có thể bị ghi đè. Dùng -i khi chưa chắc chắn."),
    command("cp", "files", "Cơ bản", "Sao chép tệp hoặc thư mục sang vị trí khác.", "cp [tùy_chọn] nguồn đích", "cp notes.txt backup/", "", ["-r — sao chép thư mục đệ quy", "-i — hỏi trước khi ghi đè", "-a — giữ nguyên thuộc tính"]),
    command("rm", "files", "Cơ bản", "Xóa tệp hoặc thư mục.", "rm [tùy_chọn] mục_tiêu", "rm old-note.txt", "", ["-r — xóa thư mục đệ quy", "-i — xác nhận từng mục", "-f — buộc xóa"], "Không có thùng rác mặc định. Luôn kiểm tra đường dẫn trước khi dùng, đặc biệt với -r hoặc -f."),
    command("touch", "files", "Cơ bản", "Tạo tệp rỗng hoặc cập nhật thời gian sửa đổi của tệp.", "touch tên_tệp", "touch README.md", ""),
    command("ln", "files", "Trung cấp", "Tạo liên kết cứng hoặc liên kết tượng trưng tới tệp.", "ln [tùy_chọn] nguồn liên_kết", "ln -s /var/log/app.log latest.log", "", ["-s — tạo symbolic link", "-f — thay thế liên kết đích"]),
    command("clear", "shell", "Cơ bản", "Dọn nội dung đang hiển thị trên màn hình terminal.", "clear", "clear", ""),
    command("cat", "text", "Cơ bản", "Ghép và in nội dung một hoặc nhiều tệp ra terminal.", "cat [tùy_chọn] tệp...", "cat notes.txt", "Keep learning. Keep building.", ["-n — đánh số dòng", "-A — hiện ký tự đặc biệt"]),
    command("echo", "shell", "Cơ bản", "In văn bản hoặc giá trị biến ra đầu ra chuẩn.", "echo [tùy_chọn] [văn_bản]", "echo \"Xin chào Linux\"", "Xin chào Linux", ["-n — không xuống dòng", "-e — diễn giải ký tự escape"]),
    command("less", "text", "Cơ bản", "Đọc nội dung dài theo từng trang và hỗ trợ tìm kiếm.", "less [tùy_chọn] tệp", "less /var/log/syslog", "", ["-N — hiện số dòng", "-S — không ngắt dòng dài"]),
    command("find", "files", "Trung cấp", "Tìm tệp và thư mục theo tên, loại, thời gian hoặc thuộc tính.", "find [đường_dẫn] [biểu_thức]", "find . -name \"*.log\"", "./logs/app.log\n./logs/error.log", ["-name — khớp tên", "-type f/d — lọc tệp hoặc thư mục", "-mtime — lọc theo ngày sửa"]),
    command("man", "shell", "Cơ bản", "Mở trang hướng dẫn tích hợp của một câu lệnh.", "man tên_lệnh", "man ls", "LS(1)  User Commands  LS(1)", ["-k — tìm theo từ khóa", "-f — mô tả ngắn"]),
    command("uname", "system", "Cơ bản", "Hiển thị thông tin kernel và kiến trúc hệ thống.", "uname [tùy_chọn]", "uname -a", "Linux lab 6.8.0 x86_64 GNU/Linux", ["-a — toàn bộ thông tin", "-r — phiên bản kernel", "-m — kiến trúc máy"]),
    command("whoami", "users", "Cơ bản", "In tên người dùng hiệu lực của phiên hiện tại.", "whoami", "whoami", "learner"),
    command("tar", "archive", "Trung cấp", "Đóng gói nhiều tệp thành archive và có thể kết hợp nén.", "tar [tùy_chọn] archive tệp...", "tar -czvf backup.tar.gz documents/", "documents/\ndocuments/notes.txt", ["-c — tạo archive", "-x — giải nén", "-z — dùng gzip", "-f — chỉ định tệp archive"]),
    command("grep", "text", "Cơ bản", "Tìm các dòng khớp với mẫu văn bản hoặc biểu thức chính quy.", "grep [tùy_chọn] mẫu [tệp]", "grep -n \"error\" app.log", "42:error: connection refused", ["-i — không phân biệt hoa thường", "-n — hiện số dòng", "-r — tìm đệ quy"]),
    command("head", "text", "Cơ bản", "Hiển thị những dòng đầu tiên của tệp.", "head [tùy_chọn] tệp", "head -n 5 notes.txt", "Dòng 1\nDòng 2\nDòng 3", ["-n N — lấy N dòng đầu"]),
    command("tail", "text", "Cơ bản", "Hiển thị những dòng cuối và có thể theo dõi tệp đang thay đổi.", "tail [tùy_chọn] tệp", "tail -f /var/log/app.log", "Listening on port 3000...", ["-n N — lấy N dòng cuối", "-f — tiếp tục theo dõi"]),
    command("diff", "text", "Trung cấp", "So sánh từng dòng và cho biết khác biệt giữa hai tệp.", "diff [tùy_chọn] tệp_1 tệp_2", "diff old.conf new.conf", "3c3\n< debug=false\n---\n> debug=true", ["-u — định dạng unified", "-r — so sánh thư mục đệ quy"]),
    command("cmp", "text", "Trung cấp", "So sánh hai tệp theo từng byte và báo vị trí khác đầu tiên.", "cmp [tùy_chọn] tệp_1 tệp_2", "cmp image-a.png image-b.png", "image-a.png image-b.png differ: byte 25", ["-s — chỉ trả mã thoát, không in"]),
    command("comm", "text", "Trung cấp", "So sánh hai tệp đã sắp xếp theo ba cột: riêng và chung.", "comm [tùy_chọn] tệp_1 tệp_2", "comm users-a.txt users-b.txt", "alice\n\tcarol\n\t\tbob", ["-1/-2/-3 — ẩn cột tương ứng"]),
    command("sort", "text", "Cơ bản", "Sắp xếp các dòng văn bản theo thứ tự.", "sort [tùy_chọn] [tệp]", "sort -n scores.txt", "2\n7\n10\n42", ["-n — theo số", "-r — đảo ngược", "-u — loại dòng trùng"]),
    command("export", "shell", "Trung cấp", "Đưa biến shell vào môi trường của các tiến trình con.", "export TÊN=giá_trị", "export PATH=\"$PATH:/opt/tools\"", "", [], "Thay đổi PATH sai có thể làm shell không tìm thấy chương trình. Nên thêm vào thay vì ghi đè hoàn toàn."),
    command("zip", "archive", "Cơ bản", "Nén tệp và thư mục thành định dạng ZIP.", "zip [tùy_chọn] archive.zip tệp...", "zip -r project.zip project/", "  adding: project/ (stored 0%)", ["-r — nén thư mục đệ quy", "-9 — mức nén cao nhất"]),
    command("unzip", "archive", "Cơ bản", "Liệt kê hoặc giải nén nội dung tệp ZIP.", "unzip [tùy_chọn] archive.zip", "unzip project.zip -d restored/", "Archive: project.zip\n extracting: restored/README.md", ["-l — chỉ liệt kê", "-d — chọn thư mục đích"]),
    command("ssh", "network", "Trung cấp", "Mở phiên shell được mã hóa tới một máy từ xa.", "ssh [tùy_chọn] user@host", "ssh dev@example.com", "dev@example.com's password:", ["-p — cổng kết nối", "-i — tệp private key", "-L — chuyển tiếp cổng cục bộ"], "Chỉ kết nối máy chủ bạn tin cậy và luôn xác minh fingerprint lần đầu."),
    command("service", "system", "Trung cấp", "Điều khiển dịch vụ hệ thống qua giao diện tương thích SysV.", "service tên_dịch_vụ hành_động", "sudo service ssh status", "Active: active (running)", ["start — khởi động", "stop — dừng", "restart — khởi động lại", "status — xem trạng thái"], "Dừng dịch vụ có thể làm ứng dụng hoặc kết nối bị gián đoạn."),
    command("ps", "system", "Cơ bản", "Chụp danh sách các tiến trình đang chạy.", "ps [tùy_chọn]", "ps aux", "USER  PID %CPU %MEM COMMAND\nroot    1  0.0  0.1 systemd", ["aux — mọi tiến trình dạng chi tiết", "-ef — định dạng đầy đủ"]),
    command("kill", "system", "Trung cấp", "Gửi tín hiệu đến một tiến trình theo PID.", "kill [tín_hiệu] PID", "kill -TERM 2481", "", ["-TERM — yêu cầu dừng an toàn", "-KILL — buộc dừng ngay", "-l — liệt kê tín hiệu"], "Ưu tiên SIGTERM trước SIGKILL để tiến trình có cơ hội dọn dẹp dữ liệu."),
    command("killall", "system", "Trung cấp", "Gửi tín hiệu tới mọi tiến trình khớp theo tên.", "killall [tùy_chọn] tên_tiến_trình", "killall -TERM firefox", "", ["-i — xác nhận trước", "-u — chỉ tiến trình của người dùng"], "Có thể dừng nhiều tiến trình cùng lúc. Hãy xác nhận chính xác tên chương trình."),
    command("df", "system", "Cơ bản", "Hiển thị dung lượng đã dùng và còn trống của các filesystem.", "df [tùy_chọn] [đường_dẫn]", "df -h", "Filesystem  Size  Used Avail Use%\n/dev/sda1    80G   24G   52G  32%", ["-h — đơn vị dễ đọc", "-T — hiện loại filesystem"]),
    command("mount", "system", "Nâng cao", "Gắn một filesystem vào cây thư mục Linux.", "mount [tùy_chọn] thiết_bị điểm_gắn", "sudo mount /dev/sdb1 /mnt/usb", "", ["-t — loại filesystem", "-o — tùy chọn gắn"], "Gắn sai thiết bị hoặc tùy chọn có thể gây lỗi dữ liệu. Cần quyền quản trị."),
    command("chmod", "users", "Trung cấp", "Thay đổi quyền đọc, ghi và thực thi của tệp.", "chmod [tùy_chọn] chế_độ tệp", "chmod 755 deploy.sh", "", ["u+x — thêm quyền chạy cho chủ sở hữu", "644 — chủ ghi, mọi người đọc", "755 — chủ ghi, mọi người chạy"], "Không cấp quyền 777 trừ khi hiểu rõ rủi ro truy cập."),
    command("chown", "users", "Trung cấp", "Thay đổi chủ sở hữu và nhóm của tệp hoặc thư mục.", "chown [tùy_chọn] user[:group] tệp", "sudo chown -R www-data:www-data site/", "", ["-R — áp dụng đệ quy"], "Thay đổi quyền sở hữu đệ quy ở sai đường dẫn có thể làm hệ thống hoặc ứng dụng ngừng hoạt động."),
    command("ifconfig", "network", "Trung cấp", "Xem hoặc cấu hình giao diện mạng theo công cụ truyền thống.", "ifconfig [giao_diện]", "ifconfig eth0", "eth0: flags=4163<UP,BROADCAST,RUNNING>\n    inet 192.168.1.42", [], "Trên hệ thống mới, lệnh ip thường được khuyến nghị thay thế.", ["ip a"]),
    command("traceroute", "network", "Trung cấp", "Theo dõi các hop mà gói tin đi qua tới máy đích.", "traceroute [tùy_chọn] host", "traceroute example.com", "1  192.168.1.1  1.2 ms\n2  10.10.0.1  8.4 ms", ["-n — không phân giải tên miền", "-m — giới hạn số hop"]),
    command("wget", "archive", "Cơ bản", "Tải tệp từ web bằng HTTP, HTTPS hoặc FTP.", "wget [tùy_chọn] URL", "wget -c https://example.com/file.zip", "Saving to: ‘file.zip’\nfile.zip 100%", ["-c — tiếp tục tải dở", "-O — chọn tên tệp đích"]),
    command("ufw", "network", "Trung cấp", "Quản lý tường lửa bằng cú pháp đơn giản trên Ubuntu.", "ufw hành_động [quy_tắc]", "sudo ufw allow 22/tcp", "Rule added", ["status — xem trạng thái", "allow — cho phép", "deny — từ chối", "enable — bật tường lửa"], "Bật hoặc sửa tường lửa từ xa có thể khóa chính kết nối SSH của bạn."),
    command("iptables", "network", "Nâng cao", "Cấu hình các quy tắc lọc và chuyển tiếp gói tin của kernel.", "iptables [bảng] lệnh quy_tắc", "sudo iptables -L -n -v", "Chain INPUT (policy ACCEPT)", ["-L — liệt kê quy tắc", "-A — thêm vào cuối chain", "-D — xóa quy tắc"], "Một quy tắc sai có thể cắt toàn bộ kết nối mạng. Luôn chuẩn bị cách khôi phục."),
    command("apt", "shell", "Cơ bản", "Quản lý gói trên Debian, Ubuntu và các bản phân phối liên quan.", "apt hành_động [gói]", "sudo apt install curl", "Setting up curl...", ["update — cập nhật chỉ mục", "install — cài gói", "remove — gỡ gói", "upgrade — nâng cấp"]),
    command("pacman", "shell", "Trung cấp", "Quản lý gói trên Arch Linux và hệ tương thích.", "pacman [tùy_chọn] [gói]", "sudo pacman -S git", "resolving dependencies...", ["-S — đồng bộ/cài gói", "-R — gỡ gói", "-Syu — cập nhật toàn hệ thống"]),
    command("yum", "shell", "Trung cấp", "Quản lý gói trên các hệ Red Hat đời cũ và tương thích.", "yum hành_động [gói]", "sudo yum install nginx", "Installed: nginx", ["install — cài", "remove — gỡ", "update — cập nhật"], "", ["dnf"]),
    command("rpm", "shell", "Nâng cao", "Cài đặt và truy vấn trực tiếp các gói định dạng RPM.", "rpm [tùy_chọn] gói.rpm", "rpm -qi bash", "Name : bash\nVersion : 5.2", ["-i — cài gói", "-q — truy vấn", "-e — gỡ gói"], "rpm không tự giải quyết dependency như yum hoặc dnf."),
    command("sudo", "users", "Cơ bản", "Chạy một lệnh với đặc quyền của người dùng khác, thường là root.", "sudo [tùy_chọn] lệnh", "sudo systemctl restart nginx", "", ["-u — chọn người dùng", "-l — liệt kê quyền được phép"], "Đọc kỹ câu lệnh trước khi xác nhận; đặc quyền root có thể thay đổi toàn bộ hệ thống."),
    command("cal", "shell", "Cơ bản", "Hiển thị lịch dạng văn bản trong terminal.", "cal [tháng] [năm]", "cal 11 2026", "   November 2026\nSu Mo Tu We Th Fr Sa", ["-3 — tháng trước, hiện tại và sau", "-y — cả năm"]),
    command("alias", "shell", "Cơ bản", "Tạo tên viết tắt cho một chuỗi lệnh thường dùng.", "alias tên='lệnh'", "alias ll='ls -lah'", "", [], "Alias chỉ tồn tại trong phiên hiện tại nếu không lưu vào tệp cấu hình shell."),
    command("dd", "system", "Nâng cao", "Sao chép dữ liệu theo block, thường dùng với image và thiết bị.", "dd if=nguồn of=đích [tùy_chọn]", "sudo dd if=linux.iso of=/dev/sdb bs=4M status=progress", "2147483648 bytes copied", ["if — nguồn vào", "of — đích ra", "bs — kích thước block", "status=progress — hiện tiến độ"], "Cực kỳ nguy hiểm: đảo nhầm if/of hoặc chọn sai thiết bị có thể xóa dữ liệu không thể khôi phục."),
    command("whereis", "shell", "Cơ bản", "Tìm vị trí binary, mã nguồn và trang man của một lệnh.", "whereis tên_lệnh", "whereis bash", "bash: /usr/bin/bash /usr/share/man/man1/bash.1.gz"),
    command("whatis", "shell", "Cơ bản", "Hiển thị mô tả một dòng lấy từ cơ sở dữ liệu trang man.", "whatis tên_lệnh", "whatis grep", "grep (1) - print lines that match patterns"),
    command("top", "system", "Cơ bản", "Theo dõi tiến trình và tài nguyên hệ thống theo thời gian thực.", "top [tùy_chọn]", "top -o %MEM", "%Cpu(s): 2.1 us, 0.7 sy\nMiB Mem: 7820 total, 4230 free", ["-p PID — chỉ một tiến trình", "-n 1 — một lần cập nhật", "-o — chọn cột sắp xếp"]),
    command("useradd", "users", "Trung cấp", "Tạo một tài khoản người dùng mới ở mức thấp.", "useradd [tùy_chọn] tên", "sudo useradd -m -s /bin/bash linh", "", ["-m — tạo home", "-s — chọn shell", "-G — thêm nhóm phụ"], "Tài khoản mới có thể cần đặt mật khẩu và cấu hình nhóm phù hợp.", ["adduser"]),
    command("usermod", "users", "Trung cấp", "Sửa thuộc tính của một tài khoản đã tồn tại.", "usermod [tùy_chọn] tên", "sudo usermod -aG sudo linh", "", ["-aG — thêm vào nhóm phụ", "-L — khóa tài khoản", "-s — đổi shell"], "Khi thêm nhóm bằng -G, thiếu -a có thể làm mất các nhóm phụ hiện có."),
    command("passwd", "users", "Cơ bản", "Đặt hoặc thay đổi mật khẩu của tài khoản người dùng.", "passwd [tên_người_dùng]", "passwd", "New password:\nRetype new password:\npasswd: password updated successfully", ["-l — khóa mật khẩu", "-u — mở khóa", "-e — buộc đổi lần đăng nhập sau"], "Không nhập mật khẩu thật vào ví dụ, lịch sử shell hoặc đoạn mã chia sẻ.")
  ];

  const STORAGE_KEY = "linux-lab-progress-v1";
  const defaultState = {
    version: 1,
    learned: [],
    favorites: [],
    quizScores: [],
    streak: 0,
    lastStudyDate: "",
    activity: {},
    theme: "dark",
    missionIndex: 0
  };

  const todayKey = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const loadState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || saved.version !== 1) return { ...defaultState, learned: [], favorites: [], quizScores: [], activity: {} };
      return {
        ...defaultState,
        ...saved,
        learned: Array.isArray(saved.learned) ? saved.learned.filter(id => commands.some(item => item.id === id)) : [],
        favorites: Array.isArray(saved.favorites) ? saved.favorites.filter(id => commands.some(item => item.id === id)) : [],
        quizScores: Array.isArray(saved.quizScores) ? saved.quizScores.slice(-20) : [],
        activity: saved.activity && typeof saved.activity === "object" ? saved.activity : {}
      };
    } catch {
      return { ...defaultState, learned: [], favorites: [], quizScores: [], activity: {} };
    }
  };

  let state = loadState();
  let activeView = "home";
  let activeCategory = "all";
  let favoritesOnly = false;
  let openCommandId = null;
  let flashcards = [...commands];
  let flashcardIndex = 0;
  let quiz = null;
  let toastTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const categoryById = id => categories.find(item => item.id === id);
  const commandById = id => commands.find(item => item.id === id);
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const shuffle = array => [...array].sort(() => Math.random() - 0.5);

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function recordActivity() {
    const key = todayKey();
    if (state.lastStudyDate !== key) {
      if (!state.lastStudyDate) {
        state.streak = 1;
      } else {
        const previous = new Date(`${state.lastStudyDate}T12:00:00`);
        const today = new Date(`${key}T12:00:00`);
        const delta = Math.round((today - previous) / 86400000);
        state.streak = delta === 1 ? state.streak + 1 : 1;
      }
      state.lastStudyDate = key;
    }
    state.activity[key] = (state.activity[key] || 0) + 1;
    saveState();
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  function setView(view) {
    activeView = view;
    $$('[data-view-panel]').forEach(panel => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
    $$('.nav-item[data-view]').forEach(button => button.classList.toggle("is-active", button.dataset.view === view));
    document.body.classList.remove("menu-open");
    $("#mobile-menu").setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (view === "library") renderLibrary();
    if (view === "progress") renderProgressPage();
  }

  function renderTracks() {
    const grid = $("#track-grid");
    grid.innerHTML = categories.map(category => {
      const group = commands.filter(item => item.category === category.id);
      const learned = group.filter(item => state.learned.includes(item.id)).length;
      const percent = Math.round((learned / group.length) * 100);
      return `<button class="track-card" type="button" data-category-track="${category.id}" style="--track-color:${category.color}">
        <span class="track-icon">${category.icon}</span>
        <h3>${category.label}</h3>
        <p>${category.description}</p>
        <div class="track-progress"><div><span>${learned}/${group.length} lệnh</span><span>${percent}%</span></div><div class="progress-track"><span style="width:${percent}%"></span></div></div>
      </button>`;
    }).join("");
  }

  function getLastSevenDays() {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return { key: todayKey(date), label: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][date.getDay()] };
    });
  }

  function renderActivity() {
    const days = getLastSevenDays();
    const values = days.map(day => state.activity[day.key] || 0);
    const max = Math.max(1, ...values);
    $("#activity-chart").innerHTML = days.map((day, index) => {
      const value = values[index];
      const height = value ? Math.max(15, Math.round(value / max * 85)) : 5;
      return `<span class="activity-day ${value ? "is-active" : ""}" title="${value} hoạt động"><i style="height:${height}%"></i><span>${day.label}</span></span>`;
    }).join("");
    $("#week-count").textContent = values.reduce((sum, value) => sum + value, 0);
  }

  function renderDashboard() {
    const total = commands.length;
    const learned = state.learned.length;
    const percent = Math.round((learned / total) * 100);
    $("#command-count").textContent = total;
    $("#hero-command-total").textContent = total;
    $("#sidebar-progress-label").textContent = `${learned}/${total}`;
    $("#sidebar-progress-bar").style.width = `${percent}%`;
    $("#learned-library").textContent = learned;
    $("#streak-count").textContent = state.streak;
    const best = state.quizScores.length ? Math.max(...state.quizScores) : null;
    $("#best-score-mini").textContent = best === null ? "—" : `${best}%`;
    $("#best-score").textContent = best === null ? "—" : `${best}%`;
    renderTracks();
    renderActivity();
  }

  function renderCategoryFilters() {
    $("#category-filters").innerHTML = [
      `<button class="category-chip ${activeCategory === "all" ? "is-active" : ""}" type="button" data-category="all">Tất cả</button>`,
      ...categories.map(category => `<button class="category-chip ${activeCategory === category.id ? "is-active" : ""}" type="button" data-category="${category.id}">${category.label}</button>`)
    ].join("");
  }

  function renderLibrary() {
    renderCategoryFilters();
    const query = $("#command-search").value.trim().toLowerCase();
    const level = $("#level-filter").value;
    const filtered = commands.filter(item => {
      const haystack = [item.name, ...item.aliases, item.summary, categoryById(item.category).label].join(" ").toLowerCase();
      return (activeCategory === "all" || item.category === activeCategory)
        && (level === "all" || item.level === level)
        && (!favoritesOnly || state.favorites.includes(item.id))
        && (!query || haystack.includes(query));
    });
    $("#results-count").textContent = `${filtered.length} lệnh`;
    $("#learned-library").textContent = state.learned.length;
    $("#library-empty").hidden = filtered.length !== 0;
    $("#command-grid").innerHTML = filtered.map(item => {
      const category = categoryById(item.category);
      const learned = state.learned.includes(item.id);
      const favorite = state.favorites.includes(item.id);
      const levelClass = item.level === "Trung cấp" ? "mid" : item.level === "Nâng cao" ? "high" : "";
      return `<article class="command-card ${learned ? "is-learned" : ""}" data-command-id="${item.id}" tabindex="0" role="button" aria-label="Xem chi tiết lệnh ${item.name}">
        <div class="command-card-top"><code>${escapeHtml(item.name)}</code><button class="favorite-star ${favorite ? "is-active" : ""}" type="button" data-favorite="${item.id}" aria-label="${favorite ? "Bỏ" : "Thêm"} yêu thích">${favorite ? "★" : "☆"}</button></div>
        <p>${escapeHtml(item.summary)}</p>
        <div class="command-card-example">$ ${escapeHtml(item.example)}</div>
        <div class="command-card-footer"><span>${category.label}</span><span><i class="level-dot ${levelClass}"></i>${item.level}</span></div>
      </article>`;
    }).join("");
  }

  function toggleFavorite(id) {
    if (state.favorites.includes(id)) state.favorites = state.favorites.filter(item => item !== id);
    else state.favorites.push(id);
    saveState();
    renderDashboard();
    renderLibrary();
    if (openCommandId === id) updateDialogButtons();
    showToast(state.favorites.includes(id) ? "Đã thêm vào yêu thích" : "Đã bỏ khỏi yêu thích");
  }

  function markLearned(id, shouldRecord = true) {
    if (!state.learned.includes(id)) {
      state.learned.push(id);
      if (shouldRecord) recordActivity();
      else saveState();
      showToast("Đã đánh dấu lệnh là đã học");
    } else {
      state.learned = state.learned.filter(item => item !== id);
      saveState();
      showToast("Đã bỏ đánh dấu đã học");
    }
    renderDashboard();
    renderLibrary();
    if (openCommandId === id) updateDialogButtons();
  }

  function updateDialogButtons() {
    const favorite = state.favorites.includes(openCommandId);
    const learned = state.learned.includes(openCommandId);
    $("#dialog-favorite").textContent = favorite ? "★ Đã yêu thích" : "☆ Thêm vào yêu thích";
    $("#dialog-favorite").classList.toggle("is-active", favorite);
    $("#dialog-learned").textContent = learned ? "✓ Đã học" : "Đánh dấu đã học";
  }

  function openCommandDialog(id) {
    const item = commandById(id);
    if (!item) return;
    openCommandId = id;
    $("#dialog-category").textContent = `${categoryById(item.category).label} · ${item.level}`;
    $("#dialog-command").textContent = item.name;
    $("#dialog-summary").textContent = item.summary;
    $("#dialog-syntax").textContent = item.syntax;
    $("#dialog-example").textContent = item.example;
    $("#dialog-output").textContent = item.output || "Lệnh thành công thường không tạo đầu ra.";
    $("#dialog-options-section").hidden = !item.options.length;
    $("#dialog-options").innerHTML = item.options.map(option => {
      const [flag, ...description] = option.split(" — ");
      return `<li><code>${escapeHtml(flag)}</code>${description.length ? ` — ${escapeHtml(description.join(" — "))}` : ""}</li>`;
    }).join("");
    $("#dialog-safety").hidden = !item.safety;
    $("#dialog-safety p").textContent = item.safety;
    updateDialogButtons();
    $("#command-dialog").showModal();
  }

  function renderProgressPage() {
    const best = state.quizScores.length ? Math.max(...state.quizScores) : null;
    $("#stat-learned").textContent = state.learned.length;
    $("#stat-score").textContent = best === null ? "—" : `${best}%`;
    $("#stat-streak").textContent = state.streak;
    $("#stat-favorites").textContent = state.favorites.length;
    $("#category-progress-list").innerHTML = categories.map(category => {
      const group = commands.filter(item => item.category === category.id);
      const learned = group.filter(item => state.learned.includes(item.id)).length;
      const percent = Math.round(learned / group.length * 100);
      return `<div class="category-progress-item"><strong>${category.label}</strong><div class="progress-track"><span style="width:${percent}%;background:${category.color}"></span></div><span>${learned}/${group.length} · ${percent}%</span></div>`;
    }).join("");
  }

  function inputMatchesCommand(raw, item) {
    const normalized = raw.trim().replace(/\s+/g, " ");
    const candidates = [item.name, ...item.aliases];
    const matches = value => candidates.some(candidate => value === candidate || value.startsWith(`${candidate} `));
    return matches(normalized) || (normalized.startsWith("sudo ") && matches(normalized.slice(5)));
  }

  const terminalExercises = commands.map(item => ({
    commandId: item.id,
    title: `Luyện lệnh ${item.name}`,
    description: item.summary,
    goal: item.example,
    hint: `Hãy bắt đầu bằng “${item.name}”${item.options[0] ? `; gợi ý: ${item.options[0]}` : "."}`,
    test: raw => inputMatchesCommand(raw, item)
  }));

  let virtualFs;
  let terminalCwd;
  let terminalHistory;

  function resetVirtualFs(clearOutput = true) {
    virtualFs = {
      "/": { type: "dir" },
      "/home": { type: "dir" },
      "/home/learner": { type: "dir" },
      "/home/learner/projects": { type: "dir" },
      "/home/learner/.bashrc": { type: "file", content: "alias ll='ls -lah'\nexport EDITOR=nano" },
      "/home/learner/notes.txt": { type: "file", content: "Keep learning. Keep building.\nLinux rewards curiosity.\nPractice a little every day." },
      "/home/learner/draft.txt": { type: "file", content: "Bản nháp Linux Lab" },
      "/home/learner/old-note.txt": { type: "file", content: "Ghi chú có thể xóa an toàn trong sandbox" },
      "/home/learner/backup": { type: "dir" },
      "/home/learner/app.log": { type: "file", content: "INFO server started\nERROR connection refused\nINFO retry successful" },
      "/home/learner/scores.txt": { type: "file", content: "42\n2\n10\n7" },
      "/home/learner/todo.txt": { type: "file", content: "learn grep\npractice permissions\nbuild a shell script" },
      "/home/learner/projects/demo.sh": { type: "file", content: "#!/bin/bash\necho \"Hello from Linux Lab\"" },
      "/etc": { type: "dir" },
      "/etc/hostname": { type: "file", content: "linuxlab" },
      "/var": { type: "dir" },
      "/var/log": { type: "dir" },
      "/var/log/app.log": { type: "file", content: "INFO server started\nWARN low disk space\nERROR connection refused\nINFO retry successful" }
    };
    terminalCwd = "/home/learner";
    terminalHistory = [];
    if (clearOutput) {
      $("#terminal-output").innerHTML = "";
      appendTerminal("info", `Linux Lab Sandbox — hỗ trợ luyện cả ${commands.length} lệnh. Gõ 'help' để xem danh sách.`);
    }
    updateTerminalPrompt();
  }

  function normalizePath(input = ".") {
    let path;
    if (input === "~" || input.startsWith("~/")) path = `/home/learner${input.slice(1)}`;
    else path = input.startsWith("/") ? input : `${terminalCwd}/${input}`;
    const parts = [];
    path.split("/").forEach(part => {
      if (!part || part === ".") return;
      if (part === "..") parts.pop();
      else parts.push(part);
    });
    return `/${parts.join("/")}` || "/";
  }

  function parentPath(path) {
    const parts = path.split("/").filter(Boolean);
    parts.pop();
    return `/${parts.join("/")}` || "/";
  }

  function baseName(path) {
    return path === "/" ? "/" : path.split("/").filter(Boolean).pop();
  }

  function childrenOf(path, includeHidden = false) {
    return Object.keys(virtualFs).filter(item => item !== path && parentPath(item) === path && (includeHidden || !baseName(item).startsWith(".")));
  }

  function displayPath(path) {
    if (path === "/home/learner") return "~";
    if (path.startsWith("/home/learner/")) return `~/${path.slice(14)}`;
    return path;
  }

  function updateTerminalPrompt() {
    $("#terminal-prompt").textContent = `learner@lab:${displayPath(terminalCwd)}$`;
  }

  function appendTerminal(type, text) {
    const output = $("#terminal-output");
    const line = document.createElement("p");
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function tokenize(input) {
    return input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)?.map(token => token.replace(/^["']|["']$/g, "")) || [];
  }

  function catalogCommandFromInput(raw) {
    const normalized = raw.trim().replace(/\s+/g, " ");
    const withoutSudo = normalized.startsWith("sudo ") ? normalized.slice(5) : normalized;
    const direct = commands.find(item => inputMatchesCommand(withoutSudo, item));
    return direct || (normalized === "sudo" || normalized.startsWith("sudo ") ? commands.find(item => item.name === "sudo") : null);
  }

  function listDirectory(targetPath, flags) {
    const entry = virtualFs[targetPath];
    if (!entry) return { error: `ls: không thể truy cập '${targetPath}': Không tồn tại` };
    if (entry.type === "file") return { output: baseName(targetPath) };
    const includeHidden = flags.includes("a");
    const detailed = flags.includes("l");
    const entries = childrenOf(targetPath, includeHidden);
    if (includeHidden) entries.unshift(`${targetPath}/..`, `${targetPath}/.`);
    const output = entries.map(path => {
      const item = path.endsWith("/.") || path.endsWith("/..") ? { type: "dir" } : virtualFs[path];
      const name = path.endsWith("/.") ? "." : path.endsWith("/..") ? ".." : `${baseName(path)}${item.type === "dir" ? "/" : ""}`;
      if (!detailed) return name;
      const size = item.type === "file" ? String(item.content.length).padStart(4, " ") : "4096";
      return `${item.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--"} 1 learner learner ${size} ${name}`;
    });
    return { output: detailed ? output.join("\n") : output.join("  ") };
  }

  function runTerminal(raw) {
    const tokens = tokenize(raw);
    if (!tokens.length) return;
    terminalHistory.push(raw);
    const name = tokens[0];
    const args = tokens.slice(1);
    const flags = args.filter(arg => arg.startsWith("-")).join("").replace(/-/g, "");
    const positionals = args.filter(arg => !arg.startsWith("-"));
    let result = { output: "" };

    if (name === "pwd") result.output = terminalCwd;
    else if (name === "ls") result = listDirectory(normalizePath(positionals[0] || "."), flags);
    else if (name === "cd") {
      const target = normalizePath(positionals[0] || "~");
      if (!virtualFs[target]) result.error = `cd: ${positionals[0]}: Không tồn tại`;
      else if (virtualFs[target].type !== "dir") result.error = `cd: ${positionals[0]}: Không phải thư mục`;
      else { terminalCwd = target; updateTerminalPrompt(); }
    } else if (name === "mkdir") {
      if (!positionals.length) result.error = "mkdir: thiếu toán hạng";
      else positionals.forEach(value => {
        const target = normalizePath(value);
        if (virtualFs[target]) result.error = `mkdir: không thể tạo '${value}': Đã tồn tại`;
        else if (!virtualFs[parentPath(target)] || virtualFs[parentPath(target)].type !== "dir") result.error = `mkdir: không thể tạo '${value}': Thiếu thư mục cha`;
        else virtualFs[target] = { type: "dir" };
      });
    } else if (name === "touch") {
      if (!positionals.length) result.error = "touch: thiếu toán hạng tệp";
      else positionals.forEach(value => {
        const target = normalizePath(value);
        if (!virtualFs[parentPath(target)]) result.error = `touch: không thể tạo '${value}': Thiếu thư mục cha`;
        else if (!virtualFs[target]) virtualFs[target] = { type: "file", content: "" };
      });
    } else if (name === "cat") {
      if (!positionals.length) result.error = "cat: thiếu tên tệp";
      else {
        const outputs = [];
        positionals.forEach(value => {
          const target = normalizePath(value);
          if (!virtualFs[target]) result.error = `cat: ${value}: Không tồn tại`;
          else if (virtualFs[target].type !== "file") result.error = `cat: ${value}: Là một thư mục`;
          else outputs.push(virtualFs[target].content);
        });
        result.output = outputs.join("\n");
      }
    } else if (name === "cp" || name === "mv") {
      if (positionals.length < 2) result.error = `${name}: thiếu toán hạng đích`;
      else {
        const source = normalizePath(positionals[0]);
        let target = normalizePath(positionals[1]);
        if (!virtualFs[source]) result.error = `${name}: không thể stat '${positionals[0]}': Không tồn tại`;
        else {
          if (virtualFs[target]?.type === "dir") target = `${target}/${baseName(source)}`;
          virtualFs[target] = { ...virtualFs[source] };
          if (name === "mv") delete virtualFs[source];
        }
      }
    } else if (name === "rm") {
      if (!positionals.length) result.error = "rm: thiếu toán hạng";
      else positionals.forEach(value => {
        const target = normalizePath(value);
        if (!virtualFs[target]) result.error = `rm: không thể xóa '${value}': Không tồn tại`;
        else if (virtualFs[target].type === "dir" && !flags.includes("r")) result.error = `rm: không thể xóa '${value}': Là một thư mục`;
        else {
          Object.keys(virtualFs).filter(path => path === target || path.startsWith(`${target}/`)).forEach(path => delete virtualFs[path]);
        }
      });
    } else if (name === "echo") {
      const redirectIndex = args.findIndex(arg => arg === ">" || arg === ">>");
      if (redirectIndex >= 0 && args[redirectIndex + 1]) {
        const target = normalizePath(args[redirectIndex + 1]);
        const content = args.slice(0, redirectIndex).join(" ");
        if (virtualFs[target] && args[redirectIndex] === ">>") virtualFs[target].content += `\n${content}`;
        else virtualFs[target] = { type: "file", content };
      } else result.output = args.filter(arg => !arg.startsWith("-")).join(" ");
    } else if (["grep", "head", "tail"].includes(name)) {
      if (name === "grep") {
        const cleanArgs = args.filter(arg => !arg.startsWith("-"));
        const [pattern, file] = cleanArgs;
        const target = file ? normalizePath(file) : null;
        if (!pattern || !file) result.error = "grep: dùng grep MẪU TỆP";
        else if (!virtualFs[target] || virtualFs[target].type !== "file") result.error = `grep: ${file}: Không tồn tại`;
        else result.output = virtualFs[target].content.split("\n").filter(line => line.toLowerCase().includes(pattern.toLowerCase())).join("\n");
      } else {
        const numericIndex = args.findIndex(arg => arg === "-n");
        const count = numericIndex >= 0 ? Number(args[numericIndex + 1]) || 10 : 10;
        const cleanArgs = args.filter((_, index) => index !== numericIndex && index !== numericIndex + 1 && !args[index].startsWith("-"));
        const file = cleanArgs[0];
        const target = file ? normalizePath(file) : null;
        if (!file) result.error = `${name}: thiếu tên tệp`;
        else if (!virtualFs[target] || virtualFs[target].type !== "file") result.error = `${name}: ${file}: Không tồn tại`;
        else {
          const lines = virtualFs[target].content.split("\n");
          result.output = (name === "head" ? lines.slice(0, count) : lines.slice(-count)).join("\n");
        }
      }
    } else if (name === "clear") {
      $("#terminal-output").innerHTML = "";
    } else if (name === "whoami") result.output = "learner";
    else if (name === "uname") result.output = flags.includes("a") ? "Linux linuxlab 6.8.0 #1 SMP x86_64 GNU/Linux" : "Linux";
    else if (name === "history") result.output = terminalHistory.map((line, index) => `${String(index + 1).padStart(3, " ")}  ${line}`).join("\n");
    else if (name === "man") {
      const item = commands.find(entry => entry.name === positionals[0]);
      result.output = item ? `${item.name.toUpperCase()}(1)\n\nNAME\n    ${item.name} — ${item.summary}\n\nSYNOPSIS\n    ${item.syntax}` : `Không có mục hướng dẫn cho '${positionals[0] || ""}'`;
    } else if (name === "help") result.output = `Sandbox hỗ trợ luyện cả ${commands.length} lệnh:\n${commands.map(item => item.name).join("  ")}\n\nChọn một lệnh ở bảng bên trái để nhận bài tập tương ứng.`;
    else {
      const catalogItem = catalogCommandFromInput(raw);
      if (catalogItem) {
        const simulatedOutput = catalogItem.output || `[mô phỏng] ${catalogItem.name}: lệnh đã hoàn thành thành công.`;
        result.output = catalogItem.safety
          ? `${simulatedOutput}\n\n[Sandbox an toàn] ${catalogItem.safety}`
          : simulatedOutput;
      } else result.error = `${name}: chưa có trong thư viện Linux Lab. Gõ 'help' để xem danh sách.`;
    }

    if (result.error) appendTerminal("error", result.error);
    else if (result.output) appendTerminal("", result.output);
  }

  function renderMission() {
    const index = Math.max(0, Math.min(Number(state.missionIndex) || 0, terminalExercises.length - 1));
    const mission = terminalExercises[index];
    $("#mission-number").textContent = String(index + 1).padStart(2, "0");
    $("#mission-title").textContent = mission.title;
    $("#mission-description").textContent = mission.description;
    $("#mission-goal").textContent = mission.goal;
    $("#terminal-command-select").value = mission.commandId;
    $("#mission-progress-label").textContent = `${index + 1} / ${terminalExercises.length}`;
    $("#mission-progress-bar").style.width = `${(index + 1) / terminalExercises.length * 100}%`;
    $("#mission-feedback").className = "mission-feedback";
    $("#mission-feedback").textContent = "Tự nhập một câu lệnh phù hợp vào terminal. Lệnh chỉ được mô phỏng, không chạy trên máy thật.";
  }

  function checkMission(raw) {
    const index = Math.max(0, Math.min(Number(state.missionIndex) || 0, terminalExercises.length - 1));
    const mission = terminalExercises[index];
    if (!mission.test(raw)) {
      $("#mission-feedback").className = "mission-feedback is-error";
      $("#mission-feedback").textContent = `Chưa khớp bài tập ${commandById(mission.commandId).name}. Hãy xem mục tiêu hoặc mở gợi ý rồi thử lại.`;
      return;
    }
    const related = commandById(mission.commandId);
    if (related && !state.learned.includes(related.id)) state.learned.push(related.id);
    const completedAll = index === terminalExercises.length - 1;
    state.missionIndex = completedAll ? 0 : index + 1;
    recordActivity();
    resetVirtualFs(false);
    $("#mission-feedback").className = "mission-feedback is-success";
    $("#mission-feedback").textContent = completedAll ? "Tuyệt vời — bạn đã luyện đủ cả 56 lệnh!" : `Chính xác! Lệnh ${related.name} đã được đánh dấu là đã học.`;
    renderDashboard();
    window.setTimeout(renderMission, completedAll ? 1400 : 850);
  }

  function setPracticeTab(tab) {
    $$('[data-practice-tab]').forEach(button => button.setAttribute("aria-selected", String(button.dataset.practiceTab === tab)));
    $$('[data-practice-panel]').forEach(panel => panel.classList.toggle("is-active", panel.dataset.practicePanel === tab));
    if (tab === "terminal") window.setTimeout(() => $("#terminal-input").focus(), 100);
  }

  function populateFlashcardCategories() {
    $("#flashcard-category").innerHTML = `<option value="all">Tất cả</option>${categories.map(item => `<option value="${item.id}">${item.label}</option>`).join("")}`;
  }

  function populateTerminalCommands() {
    $("#terminal-command-select").innerHTML = categories.map(category => {
      const options = commands.filter(item => item.category === category.id).map(item => `<option value="${item.id}">${item.name} — ${item.summary}</option>`).join("");
      return `<optgroup label="${category.label}">${options}</optgroup>`;
    }).join("");
  }

  function practiceCommandInTerminal(id) {
    const index = commands.findIndex(item => item.id === id);
    if (index < 0) return;
    state.missionIndex = index;
    saveState();
    resetVirtualFs();
    renderMission();
    if ($("#command-dialog").open) $("#command-dialog").close();
    setView("practice");
    setPracticeTab("terminal");
  }

  function studyCommandAsFlashcard(id) {
    const index = commands.findIndex(item => item.id === id);
    if (index < 0) return;
    flashcards = [...commands];
    flashcardIndex = index;
    $("#flashcard-category").value = "all";
    renderFlashcard();
    if ($("#command-dialog").open) $("#command-dialog").close();
    setView("practice");
    setPracticeTab("flashcards");
  }

  function renderFlashcard() {
    if (!flashcards.length) return;
    flashcardIndex = (flashcardIndex + flashcards.length) % flashcards.length;
    const item = flashcards[flashcardIndex];
    $("#flashcard").classList.remove("is-flipped");
    $("#flashcard-counter").textContent = `${flashcardIndex + 1} / ${flashcards.length}`;
    $("#flashcard-command").textContent = item.name;
    $("#flashcard-summary").textContent = item.summary;
    $("#flashcard-example").textContent = `$ ${item.example}`;
    $("#flashcard-know").textContent = state.learned.includes(item.id) ? "✓ Đã hiểu" : "Đã hiểu";
  }

  function createQuizQuestions() {
    return shuffle(commands).slice(0, 10).map((item, index) => {
      const distractors = shuffle(commands.filter(other => other.id !== item.id && (index % 2 ? other.category === item.category : true))).slice(0, 3);
      if (index % 3 === 0) {
        return { type: "CHỌN CÂU LỆNH", question: `Lệnh nào phù hợp với mô tả: “${item.summary}”`, answer: item.name, options: shuffle([item.name, ...distractors.map(entry => entry.name)]), explanation: `Đáp án là ${item.name}: ${item.summary}` };
      }
      if (index % 3 === 1) {
        return { type: "ĐỌC VÍ DỤ", question: `Câu lệnh “${item.example}” thuộc nhóm nào?`, answer: categoryById(item.category).label, options: shuffle([categoryById(item.category).label, ...shuffle(categories.filter(category => category.id !== item.category)).slice(0, 3).map(category => category.label)]), explanation: `${item.name} thuộc nhóm ${categoryById(item.category).label}.` };
      }
      return { type: "NHẬN BIẾT CÚ PHÁP", question: `Đâu là cú pháp đúng của lệnh ${item.name}?`, answer: item.syntax, options: shuffle([item.syntax, ...distractors.map(entry => entry.syntax)]), explanation: `Cú pháp tổng quát: ${item.syntax}` };
    });
  }

  function startQuiz() {
    quiz = { questions: createQuizQuestions(), index: 0, score: 0, answered: false };
    $("#quiz-start").hidden = true;
    $("#quiz-result").hidden = true;
    $("#quiz-active").hidden = false;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const item = quiz.questions[quiz.index];
    quiz.answered = false;
    $("#quiz-progress").textContent = `Câu ${quiz.index + 1} / ${quiz.questions.length}`;
    $("#quiz-score").textContent = `${quiz.score * 10} điểm`;
    $("#quiz-progress-bar").style.width = `${quiz.index / quiz.questions.length * 100}%`;
    $("#quiz-type").textContent = item.type;
    $("#quiz-question").textContent = item.question;
    $("#quiz-explanation").hidden = true;
    $("#quiz-next").hidden = true;
    $("#quiz-options").innerHTML = item.options.map(option => `<button class="quiz-option" type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("");
  }

  function answerQuiz(answer, button) {
    if (quiz.answered) return;
    quiz.answered = true;
    const question = quiz.questions[quiz.index];
    const correct = answer === question.answer;
    if (correct) quiz.score += 1;
    $$('.quiz-option').forEach(option => {
      option.disabled = true;
      if (option.dataset.answer === question.answer) option.classList.add("is-correct");
    });
    if (!correct) button.classList.add("is-wrong");
    $("#quiz-score").textContent = `${quiz.score * 10} điểm`;
    $("#quiz-explanation").textContent = `${correct ? "Chính xác." : "Chưa đúng."} ${question.explanation}`;
    $("#quiz-explanation").hidden = false;
    $("#quiz-next").textContent = quiz.index === quiz.questions.length - 1 ? "Xem kết quả" : "Câu tiếp theo";
    $("#quiz-next").hidden = false;
  }

  function advanceQuiz() {
    if (quiz.index < quiz.questions.length - 1) {
      quiz.index += 1;
      renderQuizQuestion();
      return;
    }
    const score = quiz.score * 10;
    state.quizScores.push(score);
    state.quizScores = state.quizScores.slice(-20);
    recordActivity();
    $("#quiz-active").hidden = true;
    $("#quiz-result").hidden = false;
    $("#quiz-final-score").textContent = score;
    $("#quiz-result-title").textContent = score >= 80 ? "Phản xạ rất tốt!" : score >= 60 ? "Tiến bộ rõ rệt!" : "Khởi đầu tốt!";
    $("#quiz-result-copy").textContent = score >= 80 ? "Bạn đã nắm chắc phần lớn câu lệnh trong lượt này." : "Xem lại flashcard rồi thử thêm một lượt để củng cố trí nhớ.";
    renderDashboard();
  }

  function bindEvents() {
    $$('.nav-item[data-view]').forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
    $$('[data-go]').forEach(button => button.addEventListener("click", () => setView(button.dataset.go)));
    $$('[data-view-link]').forEach(link => link.addEventListener("click", event => { event.preventDefault(); setView(link.dataset.viewLink); }));
    $("#continue-learning").addEventListener("click", () => { setView("practice"); setPracticeTab("terminal"); });
    $("#mobile-menu").addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      $("#mobile-menu").setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", event => {
      if (document.body.classList.contains("menu-open") && !event.target.closest(".sidebar") && !event.target.closest("#mobile-menu")) {
        document.body.classList.remove("menu-open");
        $("#mobile-menu").setAttribute("aria-expanded", "false");
      }
    });

    $("#theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = state.theme;
      $("#theme-toggle").textContent = state.theme === "dark" ? "☼" : "☾";
      saveState();
    });

    $("#track-grid").addEventListener("click", event => {
      const card = event.target.closest("[data-category-track]");
      if (!card) return;
      activeCategory = card.dataset.categoryTrack;
      setView("library");
    });
    $("#command-search").addEventListener("input", renderLibrary);
    $("#level-filter").addEventListener("change", renderLibrary);
    $("#favorites-filter").addEventListener("click", event => {
      favoritesOnly = !favoritesOnly;
      event.currentTarget.setAttribute("aria-pressed", String(favoritesOnly));
      renderLibrary();
    });
    $("#category-filters").addEventListener("click", event => {
      const chip = event.target.closest("[data-category]");
      if (!chip) return;
      activeCategory = chip.dataset.category;
      renderLibrary();
    });
    $("#clear-filters").addEventListener("click", () => {
      activeCategory = "all";
      favoritesOnly = false;
      $("#command-search").value = "";
      $("#level-filter").value = "all";
      $("#favorites-filter").setAttribute("aria-pressed", "false");
      renderLibrary();
    });
    $("#command-grid").addEventListener("click", event => {
      const favorite = event.target.closest("[data-favorite]");
      if (favorite) { event.stopPropagation(); toggleFavorite(favorite.dataset.favorite); return; }
      const card = event.target.closest("[data-command-id]");
      if (card) openCommandDialog(card.dataset.commandId);
    });
    $("#command-grid").addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-command-id]")) {
        event.preventDefault();
        openCommandDialog(event.target.dataset.commandId);
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        setView("library");
        $("#command-search").focus();
      }
    });

    $("#dialog-close").addEventListener("click", () => $("#command-dialog").close());
    $("#command-dialog").addEventListener("click", event => {
      if (event.target === $("#command-dialog")) $("#command-dialog").close();
    });
    $("#dialog-favorite").addEventListener("click", () => toggleFavorite(openCommandId));
    $("#dialog-learned").addEventListener("click", () => markLearned(openCommandId));
    $("#dialog-flashcard").addEventListener("click", () => studyCommandAsFlashcard(openCommandId));
    $("#dialog-terminal").addEventListener("click", () => practiceCommandInTerminal(openCommandId));
    $$('[data-copy-target]').forEach(button => button.addEventListener("click", async () => {
      const text = $(`#${button.dataset.copyTarget}`).textContent;
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
        else {
          const helper = document.createElement("textarea");
          helper.value = text;
          helper.style.position = "fixed";
          helper.style.opacity = "0";
          document.body.appendChild(helper);
          helper.select();
          document.execCommand("copy");
          helper.remove();
        }
        showToast("Đã sao chép vào clipboard");
      } catch { showToast("Không thể sao chép tự động — hãy chọn nội dung thủ công"); }
    }));

    $$('[data-practice-tab]').forEach(button => button.addEventListener("click", () => setPracticeTab(button.dataset.practiceTab)));
    $$('[data-open-practice]').forEach(button => button.addEventListener("click", () => { setView("practice"); setPracticeTab(button.dataset.openPractice); }));
    $("#terminal-form").addEventListener("submit", event => {
      event.preventDefault();
      const input = $("#terminal-input");
      const raw = input.value.trim();
      if (!raw) return;
      appendTerminal("command", `${$("#terminal-prompt").textContent} ${raw}`);
      runTerminal(raw);
      checkMission(raw);
      input.value = "";
    });
    $("#terminal-reset").addEventListener("click", () => { resetVirtualFs(); showToast("Đã đặt lại sandbox"); });
    $("#terminal-command-select").addEventListener("change", event => practiceCommandInTerminal(event.target.value));
    $("#mission-hint").addEventListener("click", () => {
      const mission = terminalExercises[Math.min(state.missionIndex, terminalExercises.length - 1)];
      $("#mission-feedback").className = "mission-feedback is-hint";
      $("#mission-feedback").textContent = mission.hint;
    });
    $("#mission-skip").addEventListener("click", () => {
      if (state.missionIndex < terminalExercises.length - 1) state.missionIndex += 1;
      else state.missionIndex = 0;
      saveState();
      renderMission();
    });

    $("#flashcard").addEventListener("click", event => event.currentTarget.classList.toggle("is-flipped"));
    $("#flashcard-prev").addEventListener("click", () => { flashcardIndex -= 1; renderFlashcard(); });
    $("#flashcard-next").addEventListener("click", () => { flashcardIndex += 1; renderFlashcard(); });
    $("#flashcard-know").addEventListener("click", () => {
      const item = flashcards[flashcardIndex];
      if (!state.learned.includes(item.id)) markLearned(item.id);
      flashcardIndex += 1;
      renderFlashcard();
    });
    $("#flashcard-terminal").addEventListener("click", () => practiceCommandInTerminal(flashcards[flashcardIndex].id));
    $("#flashcard-category").addEventListener("change", event => {
      flashcards = event.target.value === "all" ? [...commands] : commands.filter(item => item.category === event.target.value);
      flashcardIndex = 0;
      renderFlashcard();
    });

    $("#quiz-begin").addEventListener("click", startQuiz);
    $("#quiz-options").addEventListener("click", event => {
      const option = event.target.closest("[data-answer]");
      if (option) answerQuiz(option.dataset.answer, option);
    });
    $("#quiz-next").addEventListener("click", advanceQuiz);
    $("#quiz-restart").addEventListener("click", startQuiz);

    $("#reset-progress").addEventListener("click", () => {
      if (!window.confirm("Xóa toàn bộ tiến độ, điểm quiz và lệnh yêu thích trên trình duyệt này?")) return;
      const theme = state.theme;
      state = { ...defaultState, theme, learned: [], favorites: [], quizScores: [], activity: {} };
      saveState();
      renderDashboard();
      renderLibrary();
      renderProgressPage();
      renderMission();
      renderFlashcard();
      showToast("Đã xóa toàn bộ tiến độ");
    });
  }

  function init() {
    document.documentElement.dataset.theme = state.theme;
    $("#theme-toggle").textContent = state.theme === "dark" ? "☼" : "☾";
    populateFlashcardCategories();
    populateTerminalCommands();
    renderDashboard();
    renderLibrary();
    renderProgressPage();
    renderMission();
    renderFlashcard();
    resetVirtualFs();
    bindEvents();
  }

  init();
})();
