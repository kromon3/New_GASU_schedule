function TodoSelectSubject({item,handleLessonChange,filteredArray}) {
  return (
      <>
          <select className={item.isDone ? "btn edit-btn none" : "btn edit-btn"} value={item.lesson || ""}
                  onChange={(e) => handleLessonChange(item.id, e.target.value)}
          >
              <option value="">— Предмет —</option>
              <option value="-">Отсутствует</option>
              {filteredArray.map((subjectItem) => (
                  <option key={subjectItem.subject} value={subjectItem.subject}>
                      {subjectItem.subject}
                  </option>
              ))}
          </select>
      </>
  )
}
export default TodoSelectSubject;